import MessageBoxFriend from './Components/MessageBoxFriend';
const Message = (props) => {
    const { data, connectedUsers, setMessageUsersId, showHide, getData } = props
    return (
        <>
            {
                data.map((data) => {
                    return <MessageBoxFriend key={data?._id} setMessageUsersId={setMessageUsersId} connectedUsers={connectedUsers} data={data} showHide={showHide} getData={getData} />
                })
            }
        </>
    );
}
export default Message;