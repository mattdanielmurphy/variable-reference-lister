1. scan through document looking for variables (begin with let, var, or const)
  - references to those variables are when the exact name is used
    - unless: a) name is used within pairs of ' or "
              b) name is used within pairs of ` but NOT within {} followed by $ 
2. when variable or reference is found, record its line number along with the function to which it belongs

Data structure:

```
1|  function getName() {
2|    let name1 = 'Matt'
3|    return name1
4|    console.log(`Hello ${name1}`)
5|  }
```
```
{
  name1: {
    lineNumber: 1,
    containingFunction: {
      name: 'getName',
      declaredAtLineNumber: 1
    },
    references: {
      4: {
        containingFunction: 'console.log'
        containingFunctionDeclaredAtLineNumber: 5
      }
    }
  }
}
```
Barebones:
```
{
  name1: {
    lineNumber: 1,
    references: [4] // just line numbers of references
  }
}
```

need to know:

 - line number

 - list of variables declared

 - in a string?

 - in a template literal string?
 
   - in the string portion of that?

if find a declaration: add to variables array
if find a reference, add under variable with line number
