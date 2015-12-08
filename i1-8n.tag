<i1-8n>

    <style scoped>
        :scope {
            display: inline-block;
        }
        .original {
            display: none;
        }
    </style>

    <span name="localised"></span>
    <span name="original" class="original"><yield /></span>

    <script>
        this.mixin('i18n')

        this.i18n.on('update', function() {
            this.update()
        }.bind(this))

        this.on('mount update', function() {
            this.localised.innerHTML = this.i18n.localise(this.original.innerHTML)
        })
    </script>

</i1-8n>
