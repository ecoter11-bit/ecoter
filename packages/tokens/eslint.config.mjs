import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['**/*.js'] },
  ...tseslint.configs.recommended
)
