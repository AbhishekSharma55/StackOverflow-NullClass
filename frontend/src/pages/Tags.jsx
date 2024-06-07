import React from 'react'

const Tags = () => {

    const Tags = [
        {
            "tag": "javascript",
            "description": "JavaScript is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions."
        },
        {
            "tag": "python",
            "description": "Python is a versatile high-level programming language for general-purpose programming."
        },
        {
            "tag": "java",
            "description": "Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible."
        },
        {
            "tag": "html",
            "description": "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser."
        },
        {
            "tag": "css",
            "description": "CSS (Cascading Style Sheets) is a stylesheet language used for describing the presentation of a document written in HTML or XML."
        },
        {
            "tag": "reactjs",
            "description": "React is a JavaScript library for building user interfaces, maintained by Facebook and a community of developers."
        },
        {
            "tag": "node.js",
            "description": "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine, used to build scalable network applications."
        },
        {
            "tag": "csharp",
            "description": "C# (pronounced 'C-sharp') is a modern, object-oriented, and type-safe programming language developed by Microsoft."
        },
        {
            "tag": "php",
            "description": "PHP is a popular general-purpose scripting language that is especially suited to web development."
        },
        {
            "tag": "ruby",
            "description": "Ruby is a dynamic, open-source programming language with a focus on simplicity and productivity."
        },
        {
            "tag": "sql",
            "description": "SQL (Structured Query Language) is a standard language for managing and manipulating relational databases."
        },
        {
            "tag": "angular",
            "description": "Angular is a platform for building mobile and desktop web applications, developed and maintained by Google."
        },
        {
            "tag": "vue.js",
            "description": "Vue.js is a progressive framework for building user interfaces, focusing on incremental adoption."
        },
        {
            "tag": "django",
            "description": "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design."
        },
        {
            "tag": "flask",
            "description": "Flask is a lightweight WSGI web application framework in Python."
        },
        {
            "tag": "swift",
            "description": "Swift is a powerful and intuitive programming language for macOS, iOS, watchOS, and tvOS, developed by Apple."
        },
        {
            "tag": "kotlin",
            "description": "Kotlin is a modern, statically typed programming language that runs on the Java Virtual Machine (JVM) and is fully interoperable with Java."
        },
        {
            "tag": "go",
            "description": "Go (also known as Golang) is a statically typed, compiled programming language designed for simplicity and efficiency."
        },
        {
            "tag": "typescript",
            "description": "TypeScript is a strongly typed, object-oriented, compiled language that builds on JavaScript, giving you better tooling at any scale."
        },
        {
            "tag": "mongodb",
            "description": "MongoDB is a document-oriented NoSQL database used for high volume data storage."
        },
        {
            "tag": "postgresql",
            "description": "PostgreSQL is an advanced, open-source relational database system."
        },
        {
            "tag": "docker",
            "description": "Docker is a platform for developing, shipping, and running applications using containerization."
        },
        {
            "tag": "kubernetes",
            "description": "Kubernetes is an open-source system for automating the deployment, scaling, and management of containerized applications."
        },
        {
            "tag": "tensorflow",
            "description": "TensorFlow is an open-source library for numerical computation and machine learning."
        },
        {
            "tag": "pandas",
            "description": "Pandas is a fast, powerful, flexible, and easy-to-use open-source data analysis and manipulation library for Python."
        },
        {
            "tag": "numpy",
            "description": "NumPy is the fundamental package for scientific computing with Python, providing support for large multi-dimensional arrays and matrices."
        },
        {
            "tag": "scikit-learn",
            "description": "Scikit-learn is a free software machine learning library for the Python programming language."
        }
    ]
    

  return (
    <div className='p-5'>
        <h1 className='text-4xl'>Tags</h1>
        <p className='text-sm m-2'>A tag is a word or phrase that describes the topic of the question. Tags are a means of connecting experts with questions they will be able to answer by sorting questions into specific, well-defined categories.</p>
        <div className='flex flex-wrap gap-4 m-10'>
            {Tags.map((tag)=>{
                return(
                    <div key={tag.tag} className='border border-gray-400 h-50 w-40 '>
                        <p className='text-center text-xl pb-2 bg-orange-200'>{tag.tag}</p>
                        <p className='text-center p-3'>{tag.description}</p>
                    </div>
                )
            })}    
        </div>
    </div>
  )
}

export default Tags