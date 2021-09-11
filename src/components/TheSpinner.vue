<template>
    <teleport to='#portal-root'>
        <semipolar-spinner
        :animation-duration="2000"
        :size="65"
        color="blue"
        />
    </teleport>
</template>

<script>
import {SemipolarSpinner} from 'epic-spinners'
    export default {
        name: 'TheSpinner',
        components: {
            SemipolarSpinner
        }
    }
</script>

<style scoped>
semipolar-spinner{
    padding: 20px;
}
</style>