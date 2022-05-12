# calver-with-release

```YAML
steps:
      - name: checkout
        uses: actions/checkout@v2
      - name: get a new tag
        id: tag-generator
        uses: snsinahub-org/calver-with-release@main
        with: 
          repo: "${{ github.repository }}"
          token: "${{ secrets.GITHUB_TOKEN }}"
      - name: print new tag
        run: |
          echo ${{ steps.tag-generator.outputs.newTag }}
```