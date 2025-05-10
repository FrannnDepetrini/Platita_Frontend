import "./Loader.css";


const Loader = ({status}) => {

    return (

        <div id="container-loader">
            {status === "loading" ? (
                <>
                    <svg className="circle-outer" viewBox="0 0 86 86">
                        <circle className="back" cx="43" cy="43" r="40"></circle>
                        <circle className="front" cx="43" cy="43" r="40"></circle>
                        <circle className="new" cx="43" cy="43" r="40"></circle>
                    </svg>
                    <svg className="circle-middle" viewBox="0 0 60 60">
                        <circle className="back" cx="30" cy="30" r="27"></circle>
                        <circle className="front" cx="30" cy="30" r="27"></circle>
                    </svg>
                    <svg className="circle-inner" viewBox="0 0 34 34">
                        <circle className="back" cx="17" cy="17" r="14"></circle>
                        <circle className="front" cx="17" cy="17" r="14"></circle>
                    </svg>
                    <div className="text" data-text="Cargando"></div>
                </>
            ) : status === "success" ? (
                <>
                    <svg width="200" height="200" viewBox="0 0 200 200">
                        <circle
                            cx="100"
                            cy="100"
                            r="70"
                            fill="none"
                            stroke="#e6e6e6"
                            strokeWidth="8"
                        />
                        <circle
                            cx="100"
                            cy="100"
                            r="70"
                            fill="none"
                            stroke="#4CAF50"
                            strokeWidth="8"
                            strokeDasharray="440"
                            strokeDashoffset="440"
                            className="circle-animation"
                        />
                        <path
                            d="M75 100 L90 115 L125 80"
                            fill="none"
                            stroke="#4CAF50"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="110"
                            strokeDashoffset="110"
                            className="check-animation"
                            opacity="0"
                        />
                    </svg>
                </>
            ): (<>
                <div>Error</div>
            </>)}
        </div>
            );
}

export default Loader;