export default function ({ store, redirect }) {
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}
