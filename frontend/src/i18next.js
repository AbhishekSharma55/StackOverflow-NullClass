import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18next.use(LanguageDetector).use(initReactI18next).init({
    debugger: true,
    lng : 'en',
    resources : {
        en : {
            translation : {
                title : "Hello World!",
                AllQuestions: "All Questions",
                Loading: "Loading...",
                QuestionsNotFound: "Questions not found.",
                AskQuestions: "Ask Questions",
                questions: "questions",
                answers: "answers",
                AskedBy: "Asked by",
                NoQuestionsFound: "No Questions Found!",
                Products: "Products",
                OverflowAPI: "Overflow API",
                Profile: "Profile",
                Logout: "Logout",
                Login: "Login",
                DeleteQuestion: "Delete Question",
                AnsweredBy: "Answered by",
                DeleteAnswer: "Delete Answer",
                YourAnswer: "Your Answer",
                SubmitAnswer: "Submit Answer",
                Users: "Users",
                Tags: "Tags",
                TheOverflowBlog: "The Overflow Blog",
                DevelopersGetHelp: "Developers get by with a little help from AI: Stack Overflow Knows code...",
                OpenSourceDevelopment: "An open-source development paradigm",
                FeaturedOnMeta: "Featured on Meta",
                TestingNewVersionJobs: "Testing a new version of Stack Overflow Jobs",
                WorkingGroupDeliverables: "What deliverables would you like to see out of a working group?",
                PriceTagBurninated: "The [price] tag is being burninated",
                DeveloperSurveyLive: "The 2024 Developer Survey Is Live",
                GetAnswersFromCommunity: "Get answers to your questions from our community of experts.",
                QuestionTitle: "Question Title",
                QuestionBody: "Question Body",
                VerifyOTP: "Verify OTP",
                OTP: "OTP",
                RecentLogins: "Recent Logins",
                UpdateYourAccount: "Update your Account",
                OverwriteAndUpdateDetails: "Overwrite the updated details and hit update to update your personal details.",
                Name: "Name",
                Email: "Email",
                UpdateDetails: "Update Details",
                IPAddress: "IP address",
                Browser: "Browser",
                OperatingSystem: "OS",
                Device: "Device",
                SignInToYourAccount: "Sign in to your account",
                Password: "Password",
                ForgotYourPassword: "Forgot your password?",
                ResetPassword: "Reset here",
                DontHaveAnAccount: "Don't have an account?",
                RegisterHere: "Register here",
                ConfirmPassword: "Confirm Password",
                CreateAccount: "Create an account",
                EnterDetailsToSignUp: "Enter your details below to sign up for a new account.",
                AlreadyHaveAnAccount: "Already have an account?",
                SignIn: "Sign in",
                TagDescription: "A tag is a word or phrase that describes the topic of the question. Tags are a means of connecting experts with questions they will be able to answer by sorting questions into specific, well-defined categories.",
                User: "User",
                UserCreated: "User Created",
                SelectLanguage: "Select your language",
                ChangeLanguagePhoneOTP: "Changing Language other than French needs Phone OTP verification.",
                ChangeLanguageEmailOTP: "Changing Language to French needs Email OTP verification.",
                GenerateOTP: "Generate OTP",
                OTPSendEmail: "OTP Sent to Your Email Address.",
                OTPSendPhone: "OTP Sent to Your Phone Number."
            }
        },
        es : {
            translation : {
                title : "¡Hola Mundo!",
                AllQuestions: "Todas las preguntas",
                Loading: "Cargando...",
                QuestionsNotFound: "Preguntas no encontradas.",
                AskQuestions: "Hacer preguntas",
                questions: "preguntas",
                answers: "respuestas",
                AskedBy: "Preguntado por",
                NoQuestionsFound: "¡No se encontraron preguntas!",
                Products: "Productos",
                OverflowAPI: "API de Overflow",
                Profile: "Perfil",
                Logout: "Cerrar sesión",
                Login: "Iniciar sesión",
                DeleteQuestion: "Eliminar pregunta",
                AnsweredBy: "Respondido por",
                DeleteAnswer: "Eliminar respuesta",
                YourAnswer: "Tu respuesta",
                SubmitAnswer: "Enviar respuesta",
                Users: "Usuarios",
                Tags: "Etiquetas",
                TheOverflowBlog: "El blog de Overflow",
                DevelopersGetHelp: "Los desarrolladores se las arreglan con un poco de ayuda de la IA: Stack Overflow sabe de código...",
                OpenSourceDevelopment: "Un paradigma de desarrollo de código abierto",
                FeaturedOnMeta: "Destacado en Meta",
                TestingNewVersionJobs: "Probando una nueva versión de Stack Overflow Jobs",
                WorkingGroupDeliverables: "¿Qué entregables te gustaría ver de un grupo de trabajo?",
                PriceTagBurninated: "La etiqueta [price] está siendo quemada",
                DeveloperSurveyLive: "La encuesta para desarrolladores de 2024 está en vivo",
                GetAnswersFromCommunity: "Obtén respuestas a tus preguntas de nuestra comunidad de expertos.",
                QuestionTitle: "Título de la pregunta",
                QuestionBody: "Cuerpo de la pregunta",
                VerifyOTP: "Verificar OTP",
                OTP: "OTP",
                RecentLogins: "Inicios de sesión recientes",
                UpdateYourAccount: "Actualiza tu cuenta",
                OverwriteAndUpdateDetails: "Sobrescribe los detalles actualizados y presiona actualizar para actualizar tu información personal.",
                Name: "Nombre",
                Email: "Correo electrónico",
                UpdateDetails: "Actualizar detalles",
                IPAddress: "Dirección IP",
                Browser: "Navegador",
                OperatingSystem: "SO",
                Device: "Dispositivo",
                SignInToYourAccount: "Inicia sesión en tu cuenta",
                Password: "Contraseña",
                ForgotYourPassword: "¿Olvidaste tu contraseña?",
                ResetPassword: "Restablecer aquí",
                DontHaveAnAccount: "¿No tienes una cuenta?",
                RegisterHere: "Regístrate aquí",
                ConfirmPassword: "Confirmar contraseña",
                CreateAccount: "Crear una cuenta",
                EnterDetailsToSignUp: "Ingresa tus datos a continuación para registrarte en una nueva cuenta.",
                AlreadyHaveAnAccount: "¿Ya tienes una cuenta?",
                SignIn: "Iniciar sesión",
                TagDescription: "Una etiqueta es una palabra o frase que describe el tema de la pregunta. Las etiquetas son un medio para conectar a los expertos con preguntas que podrán responder al clasificar las preguntas en categorías específicas y bien definidas.",
                User: "Usuario",
                UserCreated: "Usuario Creado",
                SelectLanguage: "Selecciona tu idioma",
                ChangeLanguagePhoneOTP: "Cambiar el idioma distinto al francés necesita verificación de OTP por teléfono.",
                ChangeLanguageEmailOTP: "Cambiar el idioma al francés necesita verificación de OTP por correo electrónico.",
                GenerateOTP: "Generar OTP",
                OTPSendEmail: "OTP enviado a tu dirección de correo electrónico.",
                OTPSendPhone: "OTP enviado a tu número de teléfono."
            }
        },
        hi : {
            translation : {
                title : "नमस्ते दुनिया!",
                AllQuestions: "सभी प्रश्न",
                Loading: "लोड हो रहा है...",
                QuestionsNotFound: "प्रश्न नहीं मिले।",
                AskQuestions: "प्रश्न पूछें",
                questions: "प्रश्न",
                answers: "उत्तर",
                AskedBy: "द्वारा पूछा गया",
                NoQuestionsFound: "कोई प्रश्न नहीं मिला!",
                Products: "उत्पाद",
                OverflowAPI: "ओवरफ्लो एपीआई",
                Profile: "प्रोफ़ाइल",
                Logout: "लॉग आउट",
                Login: "लॉग इन",
                DeleteQuestion: "प्रश्न हटाएं",
                AnsweredBy: "द्वारा उत्तर दिया गया",
                DeleteAnswer: "उत्तर हटाएं",
                YourAnswer: "आपका उत्तर",
                SubmitAnswer: "उत्तर जमा करें",
                Users: "उपयोगकर्ता",
                Tags: "टैग्स",
                TheOverflowBlog: "द ओवरफ्लो ब्लॉग",
                DevelopersGetHelp: "डेवलपर्स को एआई से थोड़ी मदद मिलती है: स्टैक ओवरफ्लो कोड जानता है...",
                OpenSourceDevelopment: "एक ओपन-सोर्स विकास प्रतिमान",
                FeaturedOnMeta: "मेटा पर विशेष रुप से प्रदर्शित",
                TestingNewVersionJobs: "स्टैक ओवरफ्लो जॉब्स के एक नए संस्करण का परीक्षण",
                WorkingGroupDeliverables: "कार्य समूह से आप कौन से डिलिवरेबल्स देखना चाहेंगे?",
                PriceTagBurninated: "[price] टैग को जलाया जा रहा है",
                DeveloperSurveyLive: "2024 का डेवलपर सर्वेक्षण लाइव है",
                GetAnswersFromCommunity: "हमारे विशेषज्ञों की समुदाय से अपने प्रश्नों के उत्तर प्राप्त करें।",
                QuestionTitle: "प्रश्न शीर्षक",
                QuestionBody: "प्रश्न का विवरण",
                VerifyOTP: "OTP सत्यापित करें",
                OTP: "OTP",
                RecentLogins: "हाल के लॉगिन",
                UpdateYourAccount: "अपना खाता अपडेट करें",
                OverwriteAndUpdateDetails: "अपडेट किए गए विवरण को अधिलेखित करें और अपडेट करने के लिए अपडेट करें दबाएं।",
                Name: "नाम",
                Email: "ईमेल",
                UpdateDetails: "विवरण अपडेट करें",
                IPAddress: "आईपी पता",
                Browser: "ब्राउज़र",
                OperatingSystem: "ऑपरेटिंग सिस्टम",
                Device: "डिवाइस",
                SignInToYourAccount: "अपने खाते में साइन इन करें",
                Password: "पासवर्ड",
                ForgotYourPassword: "अपना पासवर्ड भूल गए?",
                ResetPassword: "यहां रीसेट करें",
                DontHaveAnAccount: "खाता नहीं है?",
                RegisterHere: "यहां रजिस्टर करें",
                ConfirmPassword: "पासवर्ड की पुष्टि करें",
                CreateAccount: "खाता बनाएं",
                EnterDetailsToSignUp: "नए खाते के लिए साइन अप करने के लिए अपना विवरण दर्ज करें।",
                AlreadyHaveAnAccount: "क्या आपके पास पहले से ही एक खाता है?",
                SignIn: "साइन इन",
                TagDescription: "टैग एक शब्द या वाक्य है जो प्रश्न के विषय का वर्णन करता है। टैग्स एक उपाय हैं जिससे विशेषज्ञों को उन प्रश्नों से जो वे उत्तर दे सकते हैं को जोड़ने का साधन है विशिष्ट, स्पष्ट-परिभाषित श्रेणियों में सवालों को वर्गीकृत करके।",
                User: "उपयोगकर्ता",
                UserCreated: "उपयोगकर्ता बनाया गया",
                SelectLanguage: "अपनी भाषा चुनें",
                ChangeLanguagePhoneOTP: "फ्रेंच के अलावा अन्य भाषा बदलने के लिए फोन OTP सत्यापन की आवश्यकता है।",
                ChangeLanguageEmailOTP: "फ्रेंच में बदलने के लिए ईमेल OTP सत्यापन की आवश्यकता है।",
                GenerateOTP: "OTP उत्पन्न करें",
                OTPSendEmail: "OTP आपके ईमेल पते पर भेजा गया।",
                OTPSendPhone: "OTP आपके फोन नंबर पर भेजा गया।"
            }
        },
        pt : {
            translation : {
                title : "Olá Mundo!",
                AllQuestions: "Todas as perguntas",
                Loading: "Carregando...",
                QuestionsNotFound: "Perguntas não encontradas.",
                AskQuestions: "Fazer perguntas",
                questions: "perguntas",
                answers: "respostas",
                AskedBy: "Perguntado por",
                NoQuestionsFound: "Nenhuma pergunta encontrada!",
                Products: "Produtos",
                OverflowAPI: "API de Overflow",
                Profile: "Perfil",
                Logout: "Sair",
                Login: "Entrar",
                DeleteQuestion: "Excluir pergunta",
                AnsweredBy: "Respondido por",
                DeleteAnswer: "Excluir resposta",
                YourAnswer: "Sua resposta",
                SubmitAnswer: "Enviar resposta",
                Users: "Usuários",
                Tags: "Tags",
                TheOverflowBlog: "O blog do Overflow",
                DevelopersGetHelp: "Desenvolvedores conseguem ajuda com um pouco de IA: Stack Overflow sabe código...",
                OpenSourceDevelopment: "Um paradigma de desenvolvimento de código aberto",
                FeaturedOnMeta: "Destaque no Meta",
                TestingNewVersionJobs: "Testando uma nova versão do Stack Overflow Jobs",
                WorkingGroupDeliverables: "Quais entregáveis você gostaria de ver de um grupo de trabalho?",
                PriceTagBurninated: "A tag [price] está sendo queimada",
                DeveloperSurveyLive: "A pesquisa de desenvolvedores de 2024 está ao vivo",
                GetAnswersFromCommunity: "Obtenha respostas para suas perguntas de nossa comunidade de especialistas.",
                QuestionTitle: "Título da pergunta",
                QuestionBody: "Corpo da pergunta",
                VerifyOTP: "Verificar OTP",
                OTP: "OTP",
                RecentLogins: "Logins recentes",
                UpdateYourAccount: "Atualize sua conta",
                OverwriteAndUpdateDetails: "Sobrescreva os detalhes atualizados e pressione atualizar para atualizar seus detalhes pessoais.",
                Name: "Nome",
                Email: "E-mail",
                UpdateDetails: "Atualizar detalhes",
                IPAddress: "Endereço IP",
                Browser: "Navegador",
                OperatingSystem: "Sistema operacional",
                Device: "Dispositivo",
                SignInToYourAccount: "Faça login na sua conta",
                Password: "Senha",
                ForgotYourPassword: "Esqueceu sua senha?",
                ResetPassword: "Redefinir aqui",
                DontHaveAnAccount: "Não tem uma conta?",
                RegisterHere: "Registre-se aqui",
                ConfirmPassword: "Confirmar senha",
                CreateAccount: "Criar uma conta",
                EnterDetailsToSignUp: "Digite seus detalhes abaixo para se inscrever em uma nova conta.",
                AlreadyHaveAnAccount: "Já tem uma conta?",
                SignIn: "Entrar",
                TagDescription: "Uma tag é uma palavra ou frase que descreve o tópico da pergunta. Tags são um meio de conectar especialistas com perguntas que eles serão capazes de responder, classificando perguntas em categorias específicas e bem definidas.",
                User: "Usuário",
                UserCreated: "Usuário Criado",
                SelectLanguage: "Selecione seu idioma",
                ChangeLanguagePhoneOTP: "Mudar o idioma além do francês precisa de verificação de OTP por telefone.",
                ChangeLanguageEmailOTP: "Mudar o idioma para o francês precisa de verificação de OTP por e-mail.",
                GenerateOTP: "Gerar OTP",
                OTPSendEmail: "OTP enviado para seu endereço de e-mail.",
                OTPSendPhone: "OTP enviado para seu número de telefone."
            }
        },
        zh : {
            translation : {
                title : "你好，世界！",
                AllQuestions: "所有问题",
                Loading: "加载中...",
                QuestionsNotFound: "未找到问题。",
                AskQuestions: "提问",
                questions: "问题",
                answers: "答案",
                AskedBy: "提问者",
                NoQuestionsFound: "未找到问题！",
                Products: "产品",
                OverflowAPI: "溢出 API",
                Profile: "个人资料",
                Logout: "登出",
                Login: "登录",
                DeleteQuestion: "删除问题",
                AnsweredBy: "回答者",
                DeleteAnswer: "删除答案",
                YourAnswer: "你的答案",
                SubmitAnswer: "提交答案",
                Users: "用户",
                Tags: "标签",
                TheOverflowBlog: "Overflow 博客",
                DevelopersGetHelp: "开发人员通过 AI 获得一些帮助：Stack Overflow 知道代码...",
                OpenSourceDevelopment: "开源开发范式",
                FeaturedOnMeta: "Meta 精选",
                TestingNewVersionJobs: "测试新版本的 Stack Overflow Jobs",
                WorkingGroupDeliverables: "您希望从工作组中看到哪些可交付成果？",
                PriceTagBurninated: "[price] 标签正在燃烧",
                DeveloperSurveyLive: "2024 开发者调查正在进行中",
                GetAnswersFromCommunity: "从我们的专家社区获取问题的答案。",
                QuestionTitle: "问题标题",
                QuestionBody: "问题正文",
                VerifyOTP: "验证 OTP",
                OTP: "OTP",
                RecentLogins: "最近登录",
                UpdateYourAccount: "更新您的帐户",
                OverwriteAndUpdateDetails: "覆盖更新的详细信息并点击更新以更新您的个人详细信息。",
                Name: "名称",
                Email: "电子邮件",
                UpdateDetails: "更新详细信息",
                IPAddress: "IP 地址",
                Browser: "浏览器",
                OperatingSystem: "操作系统",
                Device: "设备",
                SignInToYourAccount: "登录到您的帐户",
                Password: "密码",
                ForgotYourPassword: "忘记密码？",
                ResetPassword: "在此重置",
                DontHaveAnAccount: "没有账户？",
                RegisterHere: "在此注册",
                ConfirmPassword: "确认密码",
                CreateAccount: "创建帐户",
                EnterDetailsToSignUp: "输入您的详细信息以注册新帐户。",
                AlreadyHaveAnAccount: "已经有一个账户？",
                SignIn: "登录",
                TagDescription: "标签是描述问题主题的单词或短语。标签是通过将问题分类到特定的、明确定义的类别中，连接专家和他们能够回答的问题的一种方式。",
                User: "用户",
                UserCreated: "用户创建",
                SelectLanguage: "选择你的语言",
                ChangeLanguagePhoneOTP: "更改语言需要手机 OTP 验证。",
                ChangeLanguageEmailOTP: "更改语言为法语需要电子邮件 OTP 验证。",
                GenerateOTP: "生成 OTP",
                OTPSendEmail: "OTP 已发送到您的电子邮件地址。",
                OTPSendPhone: "OTP 已发送到您的手机号码。"
            }
        },
        fr : {
            translation : {
                title : "Bonjour le monde!",
                AllQuestions: "toutes les questions",
                Loading: "Chargement...",
                QuestionsNotFound: "Aucune question trouvée.",
                AskQuestions: "Poser des questions",
                questions: "questions",
                answers: "réponses",
                AskedBy: "Posée par",
                NoQuestionsFound: "Aucune question trouvée !",
                Products: "Produits",
                OverflowAPI: "API Overflow",
                Profile: "Profil",
                Logout: "Déconnexion",
                Login: "Connexion",
                DeleteQuestion: "Supprimer la question",
                AnsweredBy: "Répondu par",
                DeleteAnswer: "Supprimer la réponse",
                YourAnswer: "Votre réponse",
                SubmitAnswer: "Soumettre la réponse",
                Users: "Utilisateurs",
                Tags: "Étiquettes",
                TheOverflowBlog: "Le blog Overflow",
                DevelopersGetHelp: "Les développeurs s'en sortent avec un peu d'aide de l'IA : Stack Overflow connaît le code...",
                OpenSourceDevelopment: "Un paradigme de développement open-source",
                FeaturedOnMeta: "En vedette sur Meta",
                TestingNewVersionJobs: "Test d'une nouvelle version de Stack Overflow Jobs",
                WorkingGroupDeliverables: "Quels livrables aimeriez-vous voir d'un groupe de travail?",
                PriceTagBurninated: "Le tag [price] est en train de brûler",
                DeveloperSurveyLive: "L'enquête des développeurs 2024 est en direct",
                GetAnswersFromCommunity: "Obtenez des réponses à vos questions de notre communauté d'experts.",
                QuestionTitle: "Titre de la question",
                QuestionBody: "Corps de la question",
                VerifyOTP: "Vérifier OTP",
                OTP: "OTP",
                RecentLogins: "Connexions récentes",
                UpdateYourAccount: "Mettez à jour votre compte",
                OverwriteAndUpdateDetails: "Remplacer les détails mis à jour et appuyer sur mettre à jour pour mettre à jour vos informations personnelles.",
                Name: "Nom",
                Email: "E-mail",
                UpdateDetails: "Mettre à jour les détails",
                IPAddress: "Adresse IP",
                Browser: "Navigateur",
                OperatingSystem: "OS",
                Device: "Appareil",
                SignInToYourAccount: "Connectez-vous à votre compte",
                Password: "Mot de passe",
                ForgotYourPassword: "Mot de passe oublié?",
                ResetPassword: "Réinitialiser ici",
                DontHaveAnAccount: "Vous n'avez pas de compte?",
                RegisterHere: "Inscrivez-vous ici",
                ConfirmPassword: "Confirmer le mot de passe",
                CreateAccount: "Créer un compte",
                EnterDetailsToSignUp: "Entrez vos coordonnées ci-dessous pour vous inscrire à un nouveau compte.",
                AlreadyHaveAnAccount: "Vous avez déjà un compte?",
                SignIn: "Se connecter",
                TagDescription: "Un tag est un mot ou une phrase qui décrit le sujet de la question. Les tags sont un moyen de connecter les experts avec les questions auxquelles ils pourront répondre en triant les questions en catégories spécifiques et bien définies.",
                User: "Utilisateur",
                UserCreated: "Utilisateur créé",
                SelectLanguage: "Sélectionnez votre langue",
                ChangeLanguagePhoneOTP: "Changer la langue autre que le français nécessite une vérification OTP par téléphone.",
                ChangeLanguageEmailOTP: "Changer la langue en français nécessite une vérification OTP par e-mail.",
                GenerateOTP: "Générer OTP",
                OTPSendEmail: "OTP envoyé à votre adresse e-mail.",
                OTPSendPhone: "OTP envoyé à votre numéro de téléphone."
            }
        }
    }
});
