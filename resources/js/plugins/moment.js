import moment from "moment";

const momentObject = moment;
momentObject.locale=process.env.APP_LOCALE
momentObject.defaultFormat='YYYY-MM-DD HH:mm:ss'

export default momentObject;
