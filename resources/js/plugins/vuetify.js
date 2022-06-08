// import Vuetify from "vuetify";
// // import colors from "vuetify/lib/util/colors";
// import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import * as components from "vuetify/lib/components";
import * as directives from "vuetify/lib/directives";
import { createVuetify } from "vuetify";

const vuetify = createVuetify({ components, directives });

export default vuetify;
