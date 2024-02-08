import duck from './images/quack.png';

const Duck = () => {
    return(
        <div className = "duck">
            <p>Quack</p>
            <img src={duck} alt="duck" />
        </div>
    );
}

export default Duck;