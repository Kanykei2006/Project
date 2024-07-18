import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

interface IFormTelegram {
    username: string;
    email: string;
    subject: string;
    description: string;
}

const TOKEN = import.meta.env.VITE_TG_TOKEN;
const CHAT_ID = import.meta.env.VITE_TG_CHAT_ID;

const messageModel = (data: IFormTelegram) => {
    let messaggeTg = `Username: <b>${data.username}</b>\n`;
    messaggeTg += `Email Address: <b>${data.email}</b>\n`;
    messaggeTg += `Subject: <b>${data.subject}</b>\n`;
    messaggeTg += `Description: <b>${data.description}</b>\n`;
    return messaggeTg;
};

const TelegramBot = () => {
    const { register, handleSubmit } = useForm<IFormTelegram>();
    const onSubmit: SubmitHandler<IFormTelegram> = async (data) => {
        await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            parse_mode: "html",
            text: messageModel(data),
        });
        console.log(data);
    };

    return (
        <div>
            <h1>TelegramBot</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    placeholder="usermame"
                    type="text"
                    {...register("username", { required: true })}
                />
                <input
                    placeholder="email"
                    type="text"
                    {...register("email", { required: true, 
                })}

                />
                <input
                    placeholder="subject"
                    type="text"
                    {...register("subject", { required: true })}
                />
                <input
                    placeholder="description"
                    type="text"
                    {...register("description", { required: true })}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default TelegramBot;
