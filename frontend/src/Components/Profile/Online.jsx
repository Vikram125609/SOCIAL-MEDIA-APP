const Online = (props) => {
    const { data } = props
    return data ? (
        <p>Online</p>
    ) : (
        <p>Offline</p>
    )
};
export default Online;