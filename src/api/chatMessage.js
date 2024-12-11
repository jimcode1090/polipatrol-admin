import { ENV } from "../utils";

export class ChatMessage {
    baseApi = ENV.BASE_API;
    async getLastMessage(token, chatId) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.CHAT_MESSAGE_LAST}/${chatId}`;
            const params = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    async getTotal(token, chatId) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.CHAT_MESSAGE_TOTAL}/${chatId}`;
            const params = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAll(token, chatId) {

        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.CHAT_MESSAGE}/${chatId}`;
            const params = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    async sendText(token, chatId, message) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.CHAT_MESSAGE}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    message,
                }),
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 201) throw result;

            return true;
        } catch (error) {
            console.log("Error de sendText", error)
            throw error;
        }
    }

    async sendImage(token, chatId, file) {
        try {
            const formData = new FormData();
            formData.append("chat_id", chatId);
            formData.append("image", file);

            const url = `${this.baseApi}/${ENV.API_ROUTES.CHAT_MESSAGE_IMAGE}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 201) throw result;

            return true;
        } catch (error) {
            throw error;
        }
    }
}