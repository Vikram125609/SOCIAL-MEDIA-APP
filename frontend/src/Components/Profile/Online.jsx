const Online = (props) => {
    const { data } = props
    return data ? (
        <span style={{ height: '10px', width: '10px', backgroundColor: 'green', borderRadius: '50%' }}></span>
    ) : (
        <span style={{ height: '10px', width: '10px', backgroundColor: 'red', borderRadius: '50%' }}></span>
    )
};
export default Online;