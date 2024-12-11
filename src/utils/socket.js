import io from "socket.io-client";
import { ENV} from "../utils";

export let socket = null;

export function initSocket() {

    socket = io(ENV.SOCKET_URL);

}