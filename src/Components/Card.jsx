import React from 'react';

const Card = (props) => {

    //<<<<<<<<<<<<<<<<<<<<<GET/READ TO DB>>>>>>>>>>>>>>>>>>>>>>>>
    const [storedMemes, setStoredMemes] = React.useState([]);

    const [displayMemes, setDisplayMemes] = React.useState("");

    React.useEffect(() =>{
        fetch("http://localhost:8000/api/memes")
        .then(res => res.json())
        .then(data => setStoredMemes(data))   
    }, [storedMemes] )

                 //!!!!!!!!!!!!!!!!!NEED TO FORMAT RETURN DATA:
    function showMemes() {
        setDisplayMemes(storedMemes.map(item => 
            <div key={item.id}>{'"'}{item.url}{'"   -  "'}{item.toptext}{'"  -  "'}{item.bottomtext}{'"'}</div>)) 
            console.log(storedMemes)
    }

    //<<<<<<<<<<<<<<<<<<<<<POST/SAVE TO DB>>>>>>>>>>>>>>>>>>>>>>>>
    function saveMeme (){
        const data = {
            toptext: `${props.saveTopText}`,
            bottomtext: `${props.saveBottomText}`,
            url: `${props.saveURL}`,
        }

        fetch("http://localhost:8000/api/memes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            setStoredMemes(data);
        })
        .catch(error => {
            console.error("ERROR:", error)
        }) 
    }

    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<DELETE FROM DB>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    function deleteMeme (){
        const input = document.querySelector('.delete--input');
        const id = input.value;
    
        fetch(`http://localhost:8000/api/memes/${id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("ERROR:", error)
        }) 
    }

    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<UPDATE DB>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<NEEDS FIXED/BROKEN>>>>>>>>>>>>>>>>>>>>>>>
    function updateMeme (){
        const input = document.querySelector('.update--input');
        const id = input.value;
        const [updatedMeme, setUpdatedMeme] = React.useState([])

        fetch(`http://localhost:8000/api/memes/${id}`)
        .then(res => res.json())
        .then(data => setUpdatedMeme(data))

        setDisplayMemes(updatedMeme =>
            <div key={item.id}>{'"'}{item.url}{'"   -  "'}{item.toptext}{'"  -  "'}{item.bottomtext}{'"'}</div>
        )
    }

    return (
        <div>
            <div className='save'>
                <button className="save--button" onClick={saveMeme}>SAVE MEME</button>
                <button className="show--button" onClick={showMemes}>SHOW ALL MEMES</button>
                <button className="delete--button" onClick={deleteMeme}>DELETE MEME</button>
                <input className='delete--input' placeholder='TYPE INFO FOR DELETE'></input>
                <button className="update--button" onClick={updateMeme}>UPDATE MEME</button>
                <input className='update--input' placeholder='TYPE INFO FOR UPDATE'></input>
            </div>
            <div className='data--holder'>
                {displayMemes}
            </div>
        </div>
    )
}

export default Card;