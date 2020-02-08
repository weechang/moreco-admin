<template>
    <div class="footer">
        <div class="links">
            <a href="https://github.com/weechang/moreco" target="_blank">Moreco</a>
            <a href="https://github.com/weechang" target="_blank">
                <a-icon type="github"/>
            </a>
            <a href="https://github.com/weechang/morecoAdmin" target="_blank">MorecoAdmin</a>
        </div>
        <div class="copyright"> Copyright &copy; 2019 末问</div>
    </div>
</template>

<style scoped>
    .footer {
        text-align: center;
    }

    .footer .links {
        margin-bottom: 8px;
    }

    .footer .links a {
        color: rgba(0, 0, 0, 0.45);
    }

    .footer .links a:hover {
        color: rgba(0, 0, 0, 0.65);
    }

    .footer .links a:not(:last-child) {
        margin-right: 40px;
    }

    .footer .copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
    }
</style>
