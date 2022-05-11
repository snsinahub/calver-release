# calver-with-release

```YAML
steps:
  - name: checkout
      uses: actions/checkout@v2
    - name: move tag
      uses: snsinahub-org/calver-with-release@main
      with:
        tag: "tag_name"
        repo: "${{ github.repository }}"
        token: "${{ github.GITHUB_TOKEN }}"
```