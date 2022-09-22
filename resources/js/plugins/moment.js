import moment from "moment";

const momentInstance = moment;
momentInstance.locale=process.env.APP_LOCALE
momentInstance.defaultFormat='YYYY-MM-DD HH:mm:ss'

export default momentInstance;
