const Online = (props) => {
    const { data } = props
    return (
        <>
            {
                data && <span style={{ position: 'relative',  height: '10px', width: '10px', backgroundColor: 'green', borderRadius: '50%' }}></span>
            }
            {
                !data && <span style={{ position: 'relative',  height: '10px', width: '10px', backgroundColor: 'red', borderRadius: '50%' }}></span>
            }
        </>
    )

};
export default Online;