import './directory.styles.scss';
import DirectoryItem from '../directory-item/directory-item.component';


const categories = [
    {
      "id": 1,
      "title": "hats",
      "imageUrl": "https://i.ibb.co/cvpntL1/hats.png",
      "route": 'shop/hats'
    },
    {
      "id": 2,
      "title": "jackets",
      "imageUrl": "https://i.ibb.co/px2tCc3/jackets.png",
      "route": 'shop/jackets'
    },
    {
      "id": 3,
      "title": "sneakers",
      "imageUrl": "https://i.ibb.co/0jqHpnp/sneakers.png",
      "route": 'shop/sneakers'
    },
    {
      "id": 4,
      "title": "womens",
      "imageUrl": "https://i.ibb.co/GCCdy8t/womens.png",
      "route": 'shop/womens'
    },
    {
      "id": 5,
      "title": "mens",
      "imageUrl": "https://i.ibb.co/R70vBrQ/men.png",
      "route": 'shop/mens'
    }
  ]


const Directory = () => {  // const DIRECTORY is equal to functional component that returns back this DIV - tu bolo ({categories})
                                       
        return (

            <div className="directory-container">

            {categories.map((category) => (  //A function => category(title, id, imageUrl) / that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array. Calls a defined callback function on each element of an array, and returns an array that contains the results.
                                    //If you have a variable to send{curly brackets}
            <DirectoryItem key={category.id} category={category} />        // KEY nie je v CategoryIteme.jsx, pretoze musi by v returne <CategoryItem />
                                                                          
            ))}
            
            </div>
        )

}   

export default Directory;