<i1-8n>

    <style scoped>
        :scope {
            display: inline-block;
        }
        .original {
            display: none;
        }
    </style>

    <span ref="localised"></span>
    <span ref="original" class="original"><yield /></span>

    <script>
        this.mixin('i18n')

        this.i18n.on('update', function() {
            this.update()
        }.bind(this))

        this.on('update', this.localise)

        this.on('mount', this.localise)

        localise() {
            this.refs.localised.innerHTML = this.refs.i18n.localise(this.refs.original.innerHTML)
        }
    </script>

</i1-8n>
