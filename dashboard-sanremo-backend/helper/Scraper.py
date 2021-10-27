import requests
import bs4
import re
import pandas as pd

class Scraper:
    def __init__(self):
        self.wikipedia_base_string = f'https://it.wikipedia.org/wiki/Festival_di_Sanremo_'

    def retrieve_sanremo_info(self, year):
        """
        Scrapes Sanremo informations related to a specific year edition.
        Returns a dictionary containing a list of strings (description)
        and a single string (image) which is the url of the image.
        """

        response = requests.get(f'{self.wikipedia_base_string}{year}')
        scraper = bs4.BeautifulSoup(response.content, 'html.parser')

        # description
        paragraphs = scraper.find_all('p')

        par = paragraphs[0]
        if(par.get_text()[0] == "«"):
            par = paragraphs[1]

        # full description, split into paragraphs 
        description_list = []
        while(isinstance(par, bs4.element.Tag)):
            par_descr = re.sub(r'\[([A-Za-z0-9_]+)\]', '',  par.get_text())
            par_descr = re.sub('\n', '',  par_descr)
            description_list.append(par_descr)
            par = par.nextSibling

        # image
        images = scraper.find_all('img')
        img_index = 0
        image = str(images[img_index].attrs['src'])
        while img_index < len(images) -1 and "san" not in image.lower():
            img_index += 1
            image = str(images[img_index].attrs['src'])

        ret = {
            "description": description_list,
            "image": image
        }
        return ret

    def retrieve_ranking_data(self, year):
        """
        Scrapes Sanremo final ranking related to a specific year edition.
        Returns a list of triplets containing Position, Artist and Song.
        """

        tables = pd.read_html(f'{self.wikipedia_base_string}{year}', match='Posizione')
        table = tables[0]
        data = pd.DataFrame()
        if 'Interprete' in table.columns:
            if isinstance(table.Interprete, pd.DataFrame):
                data['Interprete'] = table.Interprete.Interprete
            else:
                data['Interprete'] = table.Interprete
           
        elif 'Artista' in table.columns:
            data['Interprete'] = table['Artista']
        
        if 'Brano' in table.columns:
            data['Brano'] = table['Brano']
        elif 'Canzone' in table.columns:
            if isinstance(table.Canzone, pd.DataFrame):
                data['Brano'] = table.Canzone.Canzone
            else:
                data['Brano'] = table.Canzone

        if 'Autori' in table.columns:
            if 'Testo' in table.Autori:
                data['Autori']= table.Autori.Testo
                data['Autori']+= " "
                data['Autori'] += table.Autori.Musica
            else:
                data['Autori']= table.Autori
            
        return data.to_dict(orient='list')