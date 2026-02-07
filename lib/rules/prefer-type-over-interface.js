module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Convert interface to type',
            category: 'Stylistic Issues',
            recommended: false
        },
        fixable: 'code',
        schema: []
    },
    create(context) {
        return {
            TSInterfaceDeclaration(node) {
                const interfaceName = node.id.name;
                const sourceCode = context.sourceCode || context.getSourceCode();
                const typeParams = node.typeParameters ? sourceCode.getText(node.typeParameters) : '';

                const bodyStart = node.body.range[0];
                const bodyEnd = node.body.range[1];
                const bodyContent = sourceCode.getText().slice(bodyStart, bodyEnd);

                const parentTypes = node.extends
                    ? node.extends.map((extendNode) => sourceCode.getText(extendNode)).join(' & ')
                    : '';

                let typeText;
                if (parentTypes) {
                    typeText = `type ${interfaceName}${typeParams} = ${parentTypes} & ${bodyContent};`;
                } else {
                    typeText = `type ${interfaceName}${typeParams} = ${bodyContent};`;
                }

                context.report({
                    node,
                    message: `Interface '${interfaceName}' can be replaced by a type.`,
                    fix(fixer) {
                        return fixer.replaceText(node, typeText);
                    }
                });
            }
        };
    }
};
