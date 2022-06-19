import { useEffect, useState } from 'react';

//Services
import MarvelService from '../../services/MarvelService';

//components
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage' 
import './randomChar.scss';

//Resources
import mjolnir from '../../resources/img/mjolnir.png';




const RandomChar = () => {

    const [bannerInfo, setBannerInfo] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const {getCharacter} = MarvelService()

    useEffect(() => {
        updateChar()
        
        const timerId = setInterval(updateChar, 6000000)
        return clearInterval(timerId)
    },[])

    const onCharLoaded = (char) => {
        setBannerInfo(char)
        setLoading(false)
    }

    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const updateChar =  () => {
        setLoading(true)
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
            getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }


    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !errorMessage && !spinner ? <View char={bannerInfo}/> : null

    return (
        
        <div className="randomchar">

           {errorMessage}
           {spinner}
           {content}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button
                    onClick={updateChar}
                    className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki} = char

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;