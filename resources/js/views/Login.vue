<template>
    <v-content>
        <v-container class="fluid fill-height">
            <v-layout class="align-center justify-center">
                <v-flex class="xs12 sm8 md4">
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Login form</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form>
                                <v-text-field
                                    prepend-icon="person"
                                    name="login"
                                    label="Login"
                                    type="text"
                                ></v-text-field>
                                <v-text-field
                                    id="password"
                                    prepend-icon="lock"
                                    name="password"
                                    label="Password"
                                    type="password"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" to="/">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
export default {
    name: 'Login',
    props: {
        source: String,
    },
};
</script>

<style></style>
