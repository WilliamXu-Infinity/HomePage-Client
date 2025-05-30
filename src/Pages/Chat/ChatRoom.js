import React from "react"

export const ChatRoom = ({
	setRoomId,
	joinRoom,
	createRoom,
	messageList,
	setCurrentMessage,
	sendMessage,
	user,
	title,
	newRoom,
	setNewRoom,
}) => {
	return (
		<>
			<h3>{`Hi ${user?.username}! - ${title}`}</h3>
			<h6>Create a room</h6>
			<input
				type="text"
				placeholder="Enter room name..."
				value={newRoom?.name || ""}
				onChange={(e) => setNewRoom({ name: e.target.value })}
			/>
			<button onClick={createRoom}>Create</button>

			<h6>Join a room</h6>
			<input
				type="text"
				placeholder="Enter room ID..."
				onChange={(e) => setNewRoom({ id: e.target.value })}
			/>
			<button onClick={joinRoom}>Join</button>

			<div className="chat-header">
				<p>Live Chat</p>
			</div>

			<div className="chat-body">
				{messageList &&
					messageList.map((messageData, key) => {
						const {
							message,
							user: { username },
						} = messageData
						return (
							<p
								key={key}
								className="chat-message"
							>{`${username}: ${message}`}</p>
						)
					})}
			</div>

			<h6>Send Message</h6>
			<div className="chat-footer">
				<input
					type="text"
					placeholder="message..."
					onChange={(e) => setCurrentMessage(e.target.value)}
				/>
				<button onClick={sendMessage}>Send</button>
			</div>
		</>
	)
}

export default ChatRoom
