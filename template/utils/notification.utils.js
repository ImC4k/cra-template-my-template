import {notification} from 'antd';

const placement = 'bottomLeft';

export const showInfoNotification = (message, description=null, duration=5) => {
    notification.info({
        message: message,
        description: description,
        duration: duration,
        placement: placement,
    });
}

export const showSuccessNotification = (message, description=null, duration=5) => {
    notification.success({
        message: message,
        description: description,
        duration: duration,
        placement: placement,
    });
}

export const showErrorNotification = (message, description=null, duration=5) => {
    notification.error({
        message: message,
        description: description,
        duration: duration,
        placement: placement,
    });
}