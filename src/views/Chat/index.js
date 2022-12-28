import React, { useState, useEffect } from "react";
import SignIn from "./SignIn";
import ChatRoom from "./ChatRoom";
import useChat from "./useChat";
import { STAGE_SIGN_IN, STAGE_CHAT_PAGE } from "../Utils/constants";

function Chat({socket}) {
	const {
		setUser,
		user,
		submitSignIn,
		joinRoomId,
		joinRoom,
    createRoom,
		messageList,
		setCurrentMessage,
		sendMessage,
    onCreateRoomInput,
		stage,
		onSignInInput,
    room,
    isConnected,
    title,
    setTitle,
    newRoom,
    setNewRoom
	} = useChat(socket);

	return (
		<div className="P_Chat">
			{(stage === STAGE_SIGN_IN && (
				<SignIn
					onSignInInput={onSignInInput}
					user={user}
					submitSignIn={submitSignIn}
				/>
			)) || (
				<ChatRoom
					user={user}
					joinRoomId={joinRoomId}
					joinRoom={joinRoom}
          createRoom={createRoom}
					messageList={messageList}
					setCurrentMessage={setCurrentMessage}
					sendMessage={sendMessage}
          onCreateRoomInput={onCreateRoomInput}
          room={room}
          title={title}
          newRoom={newRoom}
          setNewRoom={setNewRoom}
				/>
			)}
		</div>
	);
}

export default Chat;
