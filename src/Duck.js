import bird from './images/quack.png';

const Duck = () => {
    return(
        <div className = "duck">
            <p>Quack</p>
            <img src={bird} alt="duck" />
        </div>
    );
}

export default Duck;