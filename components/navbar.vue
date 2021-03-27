<template>
    <b-navbar :fixed-top= "true">
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="/letter1.png"
                >
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item href="/">
                Home
            </b-navbar-item>
            <b-navbar-item href="/galery">
                Gallery
            </b-navbar-item>
            <b-navbar-item href="/about">
                About Us
            </b-navbar-item>
        </template>

        <!-- <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light">
                        Log in
                    </a>
                </div>
            </b-navbar-item>
        </template> -->
    </b-navbar>
</template>