import { useNavigate } from 'react-router-dom';

import {
    BackgroundImage,
    Body,
    DirectoryItemContainer,
  } from './directory-item.styles';

// UVOD STRANKY - WRAP
const DirectoryItem = ({ category }) => {                  // we recieve entire object as prop ({categories})

    const { imageUrl, title, route } = category                   // priradenie poloziek k premennej category, prostrednictvom { }  === TU VZNIKNE CATEGORY CONST
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

        return (

        <DirectoryItemContainer onClick={onNavigateHandler}>
      
            <BackgroundImage imageUrl={imageUrl} />  {/* object destrusturing `` - dovoluje nam pouzit string variable v dalsej string */}

            <Body>

                <h2>{title}</h2>  
                <p>shop now</p>
          
            </Body>
          
        </DirectoryItemContainer>
    )

}

export default DirectoryItem;