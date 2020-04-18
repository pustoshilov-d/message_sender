const send_to_chat = require('./functions/send_to_chat.js');
const send_broadcast = require('./functions/send_broadcast.js');


module.exports = async (group_id, post_type_own, post_link, post_text, actions) => {
    try {
        for (let num_action in actions){
            try {
                if (actions.hasOwnProperty(num_action)) {
                    let action = actions[num_action];
                    console.log(group_id, 'работаем с действием', action);

                    //проверка на # если нужен
                    if (post_type_own === 'official') {
                        if (action.extra !== null) {
                            if (!post_text.toLowerCase().includes(action.extra.toLowerCase())) {
                                console.log(group_id, 'осутствует ', action.extra);
                                continue;
                            }
                        }
                    }

                    if (action.action_type === 'broadcast') {
                        await send_broadcast(group_id, post_link, action);

                    } else if (action.action_type === 'to_chat') {
                        if (action.to_chat_list === 'all') {
                            console.log(group_id, 'мод ВСЕ чаты');
                            let flag = true;
                            let chat_id = 2000000001;
                            while (flag){
                                if (chat_id !== action.except) {
                                    flag = await send_to_chat(post_link,chat_id,action);
                                    chat_id += 1;
                                    //делей
                                }
                            }
                        } else {
                            await send_to_chat(post_link,action.to_chat_list,action);
                        }
                    }
                }
            }
            catch (e) {
                console.log(group_id, 'ошибка', e)
            }
        }

    }
    catch (e) {
        console.log(group_id, 'ошибка', e)
    }
};