<script>
export default  {
    name: 'ModalCard'
}
</script>

<template>
    <div class="modal-card"></div>
</template>

<style scoped lang="scss">
@import "../../scss/main";

.modal-card {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 600px;
    margin-top: -300px;
    margin-left: -250px;
    background-color: #ABCDFF;
}
</style>
