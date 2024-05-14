<template>

    <h1>Add Receipt</h1>

</template>

<script>
export default {
data() {
    return {
        title: '',
        amount: '',
        category: '',
        date: '',
    };
},
methods: {
    addReceipt() {
        this.$store.dispatch('receipts/addReceipt', {
            title: this.title,
            amount: this.amount,
            category: this.category,
            date: this.date
        }).then(() => {
            this.$router.push({ name: 'receipts' });
            alert('Receipt added successfully!');
        }).catch(error => {
            console.error("Failed to add receipt:", error);
            alert('Failed to add receipt: ' + error.message);
        });
    }
}
}

</script>