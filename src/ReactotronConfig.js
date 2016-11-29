if (__DEV__) {
  const Reactotron = require('reactotron-react-native').default;
  const { trackGlobalErrors } = require('reactotron-react-native');
  const { reactotronRedux } = require('reactotron-redux');

  Reactotron
    .configure()
    .use(reactotronRedux())
    // .use(trackGlobalErrors({
    //   veto: frame => frame.fileName.indexOf('/node_modules/react-native/') >= 0,
    // }))
    .connect(); // let's connect!

  console.tron = Reactotron;
}
