# babel-plugin-stateless-func-to-pure

#### Why?
For now React Stateless functions are worse in performance compared to PureComponents.
See [here](https://medium.com/modus-create-front-end-development/component-rendering-performance-in-react-df859b474adc)  
As long as this is the case I still want to use the cleaner approach of stateless functions.  
Therefore this babel plugin goes through all of your components and just rewrites them to PureComponents.  

#### This WILL Change the behaviour of your Application!
Why you ask?  
Simple. Currently Stateless functions are not Pure and do not have any willComponentUpdate logic. If your Component needs to update although props haven't changed it will break.
