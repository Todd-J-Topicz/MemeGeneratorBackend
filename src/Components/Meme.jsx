import React from 'react';
let url;

const Meme = () => {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: ""
    });

    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() =>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))   
    }, [] )

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    // console.log(allMemes.length);
    // console.log(allMemes);

    function handleChange(event){
        const {name, value} = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]:value
        }))
    }

    return (
        <main>
            <p>{url}</p>
            <div className='form'>
                <input 
                    type='text' 
                    placeholder='Top Text' 
                    className='form--input' 
                    name='topText' 
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type='text' 
                    placeholder='Bottom Text' 
                    className='form--input' 
                    name='bottomText' 
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button onClick={getMemeImage} className='form--button'>CLICK FOR A NEW MEME IMAGE 🖼</button>
            </div>
            <div className='meme'>
                <img src={meme.randomImage} className='meme--image' />
                <h2 className='meme--text top'>{meme.topText}</h2>
                <h2 className='meme--text bottom'>{meme.bottomText}</h2>
            </div>
        </main>
    )
}

export default Meme;