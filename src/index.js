const template = require('@babel/template').default;

const createClassWithProps = template(`class NAME extends React.PureComponent {
  render() {
    const PROPS = this.props;
    return RETURN;
  }
}`);

const createClassWithoutProps = template(`class NAME extends React.PureComponent {
  render() {
    return RETURN;
  }
}`);

const createClass = (name, body, path) => {
  if (path.node.params.length) {
    return createClassWithProps({
      NAME: name,
      RETURN: body,
      PROPS: path.node.params[0],
    });
  }

  return createClassWithoutProps({
    NAME: name,
    RETURN: body,
  });
};

module.exports = function statelessToPure(babel) {
  const { types: t } = babel;

  const createClassWithTypes = (name, body, types, path) => {
    const baseClass = createClass(name, body, path);

    baseClass.superTypeParameters = t.TypeParameterInstantiation([types]);

    return baseClass;
  };

  function simpleFuncToClass(path) {
    const body = path.node.body;
    const name = t.Identifier(path.parentPath.node.id.name);
    let newClass;

    if (path.node.params.length && path.node.params[0].typeAnnotation) {
      newClass = createClassWithTypes(name, body, path.node.params[0].typeAnnotation.typeAnnotation, path);
    } else {
      newClass = createClass(t.Identifier(path.parentPath.node.id.name), body, path);
    }

    path.parentPath.parentPath.replaceWith(newClass);
  }

  return {
    name: 'Functional Stateless Components to Pure',
    visitor: {
      ArrowFunctionExpression(path) {
        if (path.node.body.type === 'JSXElement' && path.parentPath.node.id) {
          simpleFuncToClass(path);
        }
      },
    },
  };
};
