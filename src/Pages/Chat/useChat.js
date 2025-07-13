import { useState, useEffect } from "react"
import { STAGE_SIGN_IN, STAGE_CHAT_PAGE } from "../Utils/constants"
import { useCookies } from "react-cookie"

const useChat = (socket) => {
	const [isConnected, setIsConnected] = useState(socket.connected)
	const [title, setTitle] = useState("Welcome to the Chat")
	const [cookies, setCookie] = useCookies(["name"])
	const [user, setUser] = useState(null)
	// const [roomList, setRoomList] = useState({ name: "" })
	const [currentRoom, setCurrentRoom] = useState({})
	const [messageList, setMessageList] = useState([])
	const [currentMessage, setCurrentMessage] = useState("")
	const [newRoom, setNewRoom] = useState({})
	const [stage, setStage] = useState(STAGE_SIGN_IN)

	useEffect(() => {
		const titleMessage = `- Current room ${currentRoom.name || "Nop T_T"}`
		setTitle(titleMessage)
	}, [currentRoom])

	const onSignInInput = (username) => setUser({ username })

	const onCreateRoomInput = (roomName) => setNewRoom({ name: roomName })

	const joinRoom = () => {
		if (user && newRoom.id) {
			socket.emit("join_room", { user, roomId: newRoom.id })
		}
	}

	const createRoom = () => {
		newRoom?.name &&
			socket.emit("create_room", { user, roomName: newRoom.name })
	}

	const submitSignIn = async () => {
		if (!user) return
		await socket.emit("sign_in", user)
	}

	const sendMessage = async () => {
		if (currentMessage !== "") {
			const messageData = {
				roomId: currentRoom.id,
				user,
				message: currentMessage,
			}

			await socket.emit("send_message", messageData)

			setMessageList((list) => [...list, messageData])
		}
	}

	useEffect(() => {
		// Check if is return user (duraction 30 days)
		const returnUser = cookies.userId
		if (returnUser) setUser(returnUser)

		socket.on("connect", () => {
			setIsConnected(true)
		})

		socket.on("disconnect", () => {
			setIsConnected(false)
		})

		return () => {
			socket.off("connect")
			socket.off("disconnect")
		}
	}, [])

	// useEffect(() => {
	// 	console.log("\x1b[31m%s\x1b[0m", "WX - check - 1")
	// 	socket.on("sign_in", (user) => {
	// 		console.log(
	// 			"\x1b[31m%s\x1b[0m",
	// 			`WX - sign in user: ${JSON.stringify(user)}`
	// 		)
	// 		setUser(user)
	// 		setStage(STAGE_CHAT_PAGE)
	// 	})

	// 	socket.on("join_room", (room) => {
	// 		console.log(
	// 			"\x1b[31m%s\x1b[0m",
	// 			`WX - join room: ${JSON.stringify(room)}`
	// 		)
	// 		setCurrentRoom(room)
	// 		setNewRoom({})
	// 	})

	// 	socket.on("receive_message", (messageData) => {
	// 		console.log(`receive message: ${messageData.message}`)
	// 		console.log(messageList)

	// 		setMessageList((list) => [...list, messageData])
	// 	})

	// 	socket.on("rooms_update", (rooms) => {
	// 		console.log(
	// 			"\x1b[31m%s\x1b[0m",
	// 			`WX - rooms: ${JSON.stringify(rooms)}`
	// 		)
	// 	})
	// }, [socket])

	return {
		setUser,
		user,
		submitSignIn,
		joinRoom,
		createRoom,
		messageList,
		setCurrentMessage,
		sendMessage,
		onCreateRoomInput,
		stage,
		onSignInInput,
		currentRoom,
		isConnected,
		title,
		setTitle,
		newRoom,
		setNewRoom,
	}
}

export default useChat
