import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Monitor, Cpu, Building2, 
  Shield, TrendingUp, Moon, Sun, ArrowUp,
  Link, Computer, Code, Lightbulb, Quote
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('summary');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentFact, setCurrentFact] = useState(0);

  const aiRoboticsFacts = [
    "ИИ может создавать произведения искусства и музыку",
    "Роботы используются в более чем 50% современных хирургических операций",
    "Первый чатбот ELIZA был создан в 1966 году",
    "Термин 'робот' происходит от чешского слова 'robota'",
  ];

  const menuItems = [
    { id: 'summary', title: 'Резюме', icon: <ChevronRight className="w-4 h-4" /> },
    { id: 'history', title: 'История', icon: <Code className="w-4 h-4" /> },
    { id: 'robot-types', title: 'Типы роботов', icon: <Computer className="w-4 h-4" /> },
    { id: 'ai-types', title: 'Типы ИИ', icon: <Cpu className="w-4 h-4" /> },
    { id: 'applications', title: 'Применения', icon: <Building2 className="w-4 h-4" /> },
    { id: 'ethics', title: 'Этика', icon: <Shield className="w-4 h-4" /> },
    { id: 'future-trends', title: 'Тенденции', icon: <TrendingUp className="w-4 h-4" /> }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
      const sections = document.querySelectorAll('section');
      let currentSection = 'summary';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % aiRoboticsFacts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const StatCard = ({ icon: Icon, title, value, trend }) => (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            </div>
          </div>
          {trend && (
            <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${
              trend > 0 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm z-50 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Monitor className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">Робототехника и ИИ</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsDarkMode(!isDarkMode)}
                      className="rounded-full"
                    >
                      {isDarkMode ? (
                        <Sun className="h-5 w-5" />
                      ) : (
                        <Moon className="h-5 w-5" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isDarkMode ? 'Включить светлую тему' : 'Включить темную тему'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <nav className="hidden md:flex space-x-4">
                {menuItems.map((item) => (
                  <TooltipProvider key={item.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a
                          href={`#${item.id}`}
                          className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all
                            ${activeSection === item.id 
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
                        >
                          {item.icon}
                          <span>{item.title}</span>
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Перейти к разделу {item.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Rotating Facts Banner */}
      <div className="fixed bottom-0 w-full bg-blue-600 dark:bg-blue-800 text-white py-2 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-3">
            <Quote className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium transition-opacity duration-300">
              {aiRoboticsFacts[currentFact]}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden fixed inset-0 z-40 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
        <nav className="fixed top-0 left-0 bottom-0 w-64 bg-white dark:bg-gray-900 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-8">
            <Monitor className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <div className="flex flex-col space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${activeSection === item.id 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
              >
                {item.icon}
                <span>{item.title}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero section */}
          <section id="summary" className="py-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Робототехника и Искусственный Интеллект
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Исследуйте будущее технологий и их влияние на общество
              </p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <StatCard 
                icon={Computer} 
                title="Активных роботов" 
                value="3.5M" 
                trend={12} 
              />
              <StatCard 
                icon={Link} 
                title="Стран используют ИИ" 
                value="156" 
                trend={8} 
              />
              <StatCard 
                icon={Lightbulb} 
                title="Инноваций в год" 
                value="12K" 
                trend={15} 
              />
            </div>

            <Alert className="mb-8">
              <AlertDescription>
                🎉 Добро пожаловать в мир робототехники и искусственного интеллекта! 
                Исследуйте последние достижения и тенденции в этой захватывающей области.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Monitor className="w-8 h-8 text-blue-600" />
                    <h3 className="text-xl font-semibold">Робототехника</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Изучите последние достижения в области робототехники и их применение в различных отраслях.
                  </p>
                </CardContent>
              </Card>

              <Card className="transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Cpu className="w-8 h-8 text-blue-600" />
                    <h3 className="text-xl font-semibold">Искусственный Интеллект</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Узнайте о различных типах ИИ и их влиянии на современные технологии.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Content sections */}
          <section id="summary" className="py-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Резюме</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300">
              Робототехника и искусственный интеллект (ИИ) - это инновационные области, в которых проектирование машин, способных выполнять задачи автономно, сочетается с разработкой интеллектуальных алгоритмов, позволяющих обрабатывать данные и учиться на собственном опыте. Вместе эти технологии меняют отрасли, повышают производительность и изменяют повседневную жизнь, что делает их ключевыми для современных инноваций и экономического роста.
            пьесе Карела"R.U.R." в 1920 году и разработка первого промышленного робота в 1960-х годах, что ознаменовало начало автоматизированного труда на производстве.[1][2][3].
        Заметные достижения в области робототехники и искусственного интеллекта привели к широкому применению в различных отраслях, включая здравоохранение, транспорт и развлечения. Например, роботы с искусственным интеллектом помогают в хирургических операциях, повышая точность и улучшая результаты лечения пациентов, а автономные автомобили совершают революцию в транспортной сфере.
         
        Однако быстрое распространение этих технологий также подняло важнейшие этические и общественные вопросы, в частности, касающиеся конфиденциальности, перемещения рабочих мест и экономического неравенства[6][7][8].
        По мере развития робототехники и искусственного интеллекта возникают серьезные противоречия, связанные с их влиянием на рынки труда и этическими рамками, регулирующими их использование. Многие эксперты утверждают, что, хотя ИИ может повысить эффективность и инновации, он также несет в себе риск усугубления существующего неравенства и создания новых форм предвзятости в процессах принятия решений[9][10]. Решение этих проблем требует совместных усилий политиков, технологов и специалистов по этике для разработки руководящих принципов, способствующих ответственному и справедливому внедрению этих преобразующих технологий[11].
        Таким образом, робототехника и искусственный интеллект находятся в авангарде технологической революции, предлагая огромный потенциал для улучшения жизни людей, но в то же время требуя критического обсуждения их этических последствий и воздействия на общество. По мере развития этих областей понимание и решение присущих им проблем будет иметь решающее значение для обеспечения того, чтобы их преимущества реализовывались на честной и справедливой основе.
              </p>
            </div>
          </section>


          <section id="history" className="py-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">История</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300">
              История робототехники - это увлекательное путешествие, охватывающее тысячи лет и отражающее постоянное стремление человечества к созданию машин, способных выполнять задачи автономно или полуавтономно. Эта эволюция прослеживается с древних цивилизаций и доходит до современных передовых технологий, которые позволяют реализовать практически все аспекты современной жизни.
              </p>
              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Древние инновации</h3>
              <p className="text-gray-600 dark:text-gray-300">
              Концепция робототехники берет свое начало в древних автоматах - сложных механических устройствах, созданных искусными мастерами, которые завораживали общество своими реалистичными движениями. Один из самых ранних известных примеров - Антикитерский механизм, древнегреческий аналоговый компьютер, датируемый II веком до н. э., который использовался для астрономических предсказаний и демонстрирует раннее увлечение автоматизацией и инженерией[1][2].
              </p>
            </div>
          </section>

          <section id="development" className="py-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Развитие робототехники</h2>
            <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Промышленная революция</h3>
              <p className="text-gray-600 dark:text-gray-300">
              Промышленная революция в XVIII веке стала поворотным моментом в развитии робототехники. Эта эпоха механизации, характеризующаяся такими инновациями, как паровые двигатели и механические ткацкие станки, заложила основу для будущих достижений. Такие изобретатели, как Ричард Аркрайт и Джеймс Уатт, сыграли решающую роль в создании машин, которые впоследствии превратились в ранние роботизированные системы[2][3].
              </p>
              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Рождение термина "робот"</h3>
              <p className="text-gray-600 dark:text-gray-300">
              Термин "робот" был популяризирован в пьесе 1920 года "R.U.R." (Универсальные роботы Россама), написанной Карелом Чапеком. Эта пьеса стала важной культурной вехой, поскольку представила концепцию искусственных существ, созданных для того, чтобы служить людям, вызвав как восхищение, так и этические дискуссии о последствиях создания автономных машин[3].
              </p>
              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">События середины XX века</h3>
              <p className="text-gray-600 dark:text-gray-300">
              В 1960-х годах были достигнуты значительные успехи в исследованиях в области робототехники, особенно в разработке роботизированных рук. Одной из самых заметных новинок стал Unimate, который стал первым промышленным роботом, использовавшимся на сборочной линии General Motors. Этот робот был разработан для выполнения повторяющихся задач, повышая тем самым безопасность и эффективность труда[4]. Примерно в то же время робот Шейки, разработанный компанией SRI International, стал одним из первых роботов с искусственным интеллектом, способных понимать свои действия и автономно планировать задачи, демонстрируя первые достижения в области искусственного интеллекта[4].
              </p>
              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Конец XX века - настоящее время</h3>
              <p className="text-gray-600 dark:text-gray-300">
              В XX веке робототехника вышла за рамки промышленного применения и стала использоваться в здравоохранении, развлечениях и освоении космоса. Внедрение роботов в медицину, например, роботизированной руки PUMA 560, используемой для проведения операций в 1980-х годах, продемонстрировало потенциал робототехники для повышения точности медицинских процедур[5][6].
              </p>
              <p className="text-gray-600 dark:text-gray-300">
              В 2010-х годах робототехника стала еще более активно внедряться в повседневную жизнь, что было отмечено повышением доступности и универсальности робототехнических компонентов. Этот период также вызвал оптимизм и озабоченность по поводу социальных последствий широкого распространения робототехники, а также дискуссии об этике искусственного интеллекта и необходимости таких рамок, как Билль о правах ИИ, для обеспечения ответственного развития[7][8].Эволюция робототехники характеризовалась постоянным стремлением повторить человеческие возможности, прокладывая путь к созданию передовых машин, которые не только помогают выполнять задачи, но и обогащают жизнь человека.  
              </p>
            </div>
          </section>


          <section id="robot-types" className="py-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Виды робототехники</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300">
              Роботы предназначены для выполнения конкретных задач в различных отраслях промышленности и средах. Классификация роботов обычно основывается на их применении, возможностях и условиях эксплуатации.
              </p>
              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Промышленные роботы</h3>
              <p className="text-gray-600 dark:text-gray-300">
              Промышленные роботы широко используются в производстве и на производстве. Они известны своей точностью, скоростью и способностью выполнять повторяющиеся задачи. Частыми примерами являются шарнирные роботы, имеющие поворотные шарниры, и роботы с шарнирным манипулятором Selective Compliance Articulated Robot Arm (SCARA), часто используемые для выполнения задач на сборочных линиях. На заводах эти роботы выполняют различные задачи, такие как сварка, покраска и обработка материалов, повышая эффективность и точность в условиях массового производства[9][6].
              </p>

              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Сервисные роботы</h3>
              <p className="text-gray-600 dark:text-gray-300">
              Сервисные роботы работают в различных отраслях, включая здравоохранение, гостиничный бизнес и бытовое обслуживание. Они взаимодействуют с людьми, помогая им в повседневной деятельности. В качестве примера можно привести бытовых роботов, таких как роботы-пылесосы, и медицинских роботов, используемых в хирургических операциях. В здравоохранении сервисные роботы улучшают уход за пациентами, предоставляя инструменты и контролируя жизненные показатели пациентов во время операций[6][10].
              </p>

              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Медицинские роботы</h3>
              <p className="text-gray-600 dark:text-gray-300">
              Медицинские роботы - это специализированные системы, предназначенные для оказания помощи в медицинских учреждениях. Они играют важнейшую роль в хирургических операциях, реабилитации и диагностике. В качестве примера можно привести роботизированные хирургические системы, экзоскелеты для реабилитации и вспомогательные устройства, такие как роботизированные конечности. Эти роботы повышают точность и эффективность медицинских вмешательств, что в конечном итоге улучшает результаты лечения пациентов[10].
              </p>


              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Гуманоидные роботы</h3>
              <p className="text-gray-600 dark:text-gray-300">
              Гуманоидные роботы предназначены для имитации человеческих движений и действий. Эти роботы внешне похожи на людей и используются в научных исследованиях, развлечениях и взаимодействии человека и робота. Их способность копировать человеческое поведение делает их ценными для изучения взаимодействия человека и робота и социального взаимодействия[10].
              </p>



              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Автономные транспортные средства</h3>
              <p className="text-gray-600 dark:text-gray-300">
              Автономные транспортные средства - это роботы, используемые в основном в транспортных целях. В эту категорию входят самоуправляемые автомобили, беспилотники и автономные роботы-доставщики. Они ориентируются и принимают решения с помощью современных датчиков и алгоритмов искусственного интеллекта, что позволяет им работать с минимальным вмешательством человека. Интеграция робототехники и искусственного интеллекта в этой области прокладывает путь к более безопасным и эффективным транспортным решениям[11].
              </p>

              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Мобильные роботы</h3>
              <p className="text-gray-600 dark:text-gray-300">
              Мобильные роботы предназначены для автономного перемещения по различным средам. В эту категорию входят роботы-газонокосилки, роботы-доставщики и разведывательные дроны. Оснащенные датчиками и навигационными системами, мобильные роботы могут преодолевать сложные участки местности и выполнять задачи без непосредственного контроля со стороны человека, что делает их полезными как в коммерческих, так и в жилых приложениях[11].
              </p>
              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Коллаборативные роботы (Cobots)</h3>
              <p className="text-gray-600 dark:text-gray-300">
              Коллаборативные роботы, или коботы, предназначены для работы вместе с людьми в общих рабочих пространствах. В отличие от традиционных промышленных роботов, которые работают изолированно, коботы оснащены средствами безопасности, которые позволяют им безопасно работать рядом с людьми.
Этот тип роботов особенно полезен на производстве, где они помогают выполнять задачи, повышая производительность и безопасность людей[11].
 
Робототехника продолжает стремительно развиваться, а технологические достижения приводят к появлению новых типов роботов и областей их применения. Каждый тип служит определенным целям и работает в конкретных областях, внося свой вклад в непрерывную трансформацию промышленности и общества
              </p>





            </div>
          </section>

          

          <section id="ai-types" className="py-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Виды искусственного интеллекта</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300">
              Искусственный интеллект (ИИ) можно разделить на несколько типов в зависимости от его возможностей и областей применения. Эти классификации помогают понять различные уровни сложности и функциональности систем ИИ.
              </p>
              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Узкий ИИ</h3>
              <p className="text-gray-600 dark:text-gray-300">
              Узкий ИИ, также известный как слабый ИИ, относится к системам ИИ, предназначенным для выполнения конкретных задач в ограниченном контексте. Такие системы преуспевают в определенных областях, но не обладают общим интеллектом. Примерами узкого ИИ являются чат-боты, алгоритмы обнаружения мошенничества и инструменты обработки естественного языка, позволяющие быстро анализировать юридические документы.[8][12] В настоящее время большинство приложений ИИ относятся к этой категории, демонстрируя эффективность в конкретных областях, таких как обслуживание клиентов и анализ данных.[8]
              </p>

              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Сильный искусственный интеллект</h3>
              <p className="text-gray-600 dark:text-gray-300">
              Сильный ИИ, или искусственный интеллект общего назначения (ИИОН), - это теоретическая концепция, описывающая ИИ с человекоподобными когнитивными способностями. В отличие от узкого ИИ, AGI будет обладать способностью понимать, учиться и применять знания в широком диапазоне задач, подобно человеку. На данный момент сильного ИИ не существует, и остается неясным, будет ли он когда-либо разработан[13].
              </p>
              <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Типы ИИ по функциональности</h3>
    <ul className="list-disc list-inside space-y-4">
      <li className="flex items-start">
        <div className="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full mt-1 mr-4"></div>
        <p className="text-gray-600 dark:text-gray-300">
          <strong>Реактивные машины:</strong> Эти системы ИИ работают исключительно на основе текущих данных, не имея возможности формировать память или использовать прошлый опыт для обоснования будущих действий. Они предназначены для фиксированной реакции на определенные стимулы[12].
        </p>
      </li>
      <li className="flex items-start">
        <div className="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full mt-1 mr-4"></div>
        <p className="text-gray-600 dark:text-gray-300">
          <strong>Ограниченная память:</strong> Этот тип ИИ может использовать прошлый опыт для принятия обоснованных решений. Например, самоуправляемые автомобили используют ограниченную память для анализа данных о предыдущих поездках, чтобы улучшить свои навигационные возможности[12].
        </p>
      </li>
      <li className="flex items-start">
        <div className="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full mt-1 mr-4"></div>
        <p className="text-gray-600 dark:text-gray-300">
          <strong>Теория разума:</strong> Это более продвинутая форма ИИ, которая все еще остается в значительной степени теоретической. Она предполагает понимание человеческих эмоций, убеждений и социальной динамики, что позволит системам ИИ более естественно взаимодействовать с людьми[12].
        </p>
      </li>
      <li className="flex items-start">
        <div className="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full mt-1 mr-4"></div>
        <p className="text-gray-600 dark:text-gray-300">
          <strong>Самосознающий ИИ:</strong> Это самый высокий уровень развития ИИ, на котором системы будут обладать самосознанием и сознанием, что позволит им понимать свое существование и потенциально принимать самостоятельные решения. В настоящее время этот тип остается спекулятивным[12].
        </p>
      </li>
    </ul>

    <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Суперинтеллект</h3>
              <p className="text-gray-600 dark:text-gray-300">
              Под сверхразумом понимается гипотетический ИИ, превосходящий человеческий интеллект во всех областях, включая творчество и социальный интеллект. Если такой ИИ будет создан, он сможет перепрограммировать себя и улучшать свои возможности экспоненциальными темпами, что приведет к значительным последствиям для общества и человеческой жизни[14]. Эта концепция поднимает важные вопросы об этике и будущем сосуществовании людей и продвинутых систем ИИ.
              </p> 
            </div>
          </section>



          <section id="applications" className="py-12">
    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Применение робототехники и искусственного интеллекта</h2>
    <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-300">
            Интеграция робототехники и искусственного интеллекта (ИИ) привела к значительным достижениям в различных отраслях, продемонстрировав их преобразующий потенциал. Совместные возможности ИИ и робототехники нашли применение в здравоохранении, транспорте, производстве и других областях, кардинально меняя подходы к выполнению задач, повышая эффективность и точность.
        </p>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Производство</h3>
        <p className="text-gray-600 dark:text-gray-300">
            В производстве робототехника и искусственный интеллект оптимизируют процессы, повышая контроль качества, эффективность и распределение ресурсов. Системы на базе ИИ позволяют проводить предиктивное обслуживание, сокращая время простоя оборудования, а также использовать алгоритмы контроля качества для обнаружения дефектов продукции. Роботы выполняют рутинные задачи с высокой точностью, освобождая людей для более сложных функций.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
            Технологии цифровых двойников позволяют создавать виртуальные копии объектов для мониторинга и оптимизации производственных линий в режиме реального времени.
        </p>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Здравоохранение</h3>
        <p className="text-gray-600 dark:text-gray-300">
            В здравоохранении ИИ и роботы применяются в хирургии, уходе за пациентами и реабилитации. Эти технологии повышают точность операций, улучшают лечение и способствуют эффективности медицинских учреждений.
        </p>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Транспорт</h3>
        <p className="text-gray-600 dark:text-gray-300">
            В транспортной отрасли алгоритмы ИИ обеспечивают автономное управление транспортными средствами, снижая количество человеческих ошибок и повышая безопасность. Роботы применяются для доставки посылок и управления запасами на складах, улучшая эффективность и безопасность в сложных условиях.
        </p>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Развлечения и искусство</h3>
        <p className="text-gray-600 dark:text-gray-300">
            Индустрия развлечений использует ИИ для создания контента и персонализированного опыта. Генерация ИИ-контента позволяет создавать уникальные виртуальные и дополненные миры, а робототехника улучшает живые выступления и художественные инсталляции, делая их интерактивными.
        </p>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Право и юридические услуги</h3>
        <p className="text-gray-600 dark:text-gray-300">
            ИИ оптимизирует юридические процессы, анализируя большие объемы текстов и ускоряя исследования. Это позволяет юристам сосредоточиться на более стратегических задачах.
        </p>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Безопасность и наблюдение</h3>
        <p className="text-gray-600 dark:text-gray-300">
            Технологии ИИ используются в системах наблюдения и распознавания лиц, улучшая общественную безопасность и защищая конфиденциальные данные благодаря биометрической аутентификации.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
            Синергия робототехники и искусственного интеллекта продолжает развиваться, прокладывая путь в будущее, где умные машины станут неотъемлемой частью нашей жизни.
        </p>
    </div>
</section>
<section id="ethics" className="py-12">
    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Этические соображения</h2>
    <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Сотрудничество с промышленностью и руководящие принципы</h3>
        <p className="text-gray-600 dark:text-gray-300">
            Этическое внедрение робототехники и искусственного интеллекта (ИИ) требует активного сотрудничества между производителями, разработчиками ИИ и отраслевыми экспертами. Создание всеобъемлющих этических рекомендаций способствует общей ответственности и учету различных точек зрения, что крайне важно для развития этической практики ИИ.
        </p>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Междисциплинарные подходы</h3>
        <p className="text-gray-600 dark:text-gray-300">
            Эффективная стратегия этической оценки ИИ предполагает создание междисциплинарных команд, включающих специалистов по этике, ученых, изучающих данные, и профессионалов в соответствующей области. Такой подход обеспечивает целостную оценку систем ИИ, рассматривая проблемы с разных сторон и усиливая внимание к этическим аспектам при их разработке и применении.
        </p>
    </div>
</section>
<section id="ethics" className="py-12">
    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Этические соображения</h2>
    <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Сотрудничество с промышленностью и руководящие принципы</h3>
        <p className="text-gray-600 dark:text-gray-300">
        Этическое внедрение робототехники и искусственного интеллекта (ИИ) требует активного сотрудничества между производителями, разработчиками ИИ и отраслевыми экспертами для создания всеобъемлющих этических рекомендаций. Такие рекомендации способствуют общей ответственности и учитывают различные точки зрения, что крайне важно для развития этической практики ИИ[18].
        </p>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Междисциплинарные подходы</h3>
        <p className="text-gray-600 dark:text-gray-300">
        Эффективная стратегия этической оценки ИИ предполагает создание междисциплинарных команд, в которые входят специалисты по этике, ученые, изучающие данные, и специалисты в данной области. Такой междисциплинарный подход позволяет проводить целостную оценку систем ИИ, рассматривая проблемы с разных сторон и усиливая этические соображения при их разработке и применении[18].
        </p>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Постоянный мониторинг и адаптация</h3>
        <h4 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Этические аудиты</h4>
        <p className="text-gray-600 dark:text-gray-300">
        Регулярный этический аудит систем ИИ необходим для обеспечения справедливости, прозрачности и выявления предвзятости. Такие проверки помогают выявить недостатки и направить необходимые доработки для поддержания этических стандартов в технологиях ИИ[18].
        </p>
        <h4 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Адаптивное обучение</h4>
        <p className="text-gray-600 dark:text-gray-300">
        Системы ИИ должны включать в себя механизмы непрерывного обучения на основе реальных результатов и отзывов пользователей. Такие процессы адаптивного обучения позволяют своевременно вносить корректировки, чтобы привести функциональные возможности ИИ в соответствие с развивающимися этическими и общественными нормами[18].
        </p>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Осведомленность и образование</h3>
        <p className="text-gray-600 dark:text-gray-300">
        Повышение осведомленности об этических проблемах ИИ имеет жизненно важное значение. Ученые считают, что "искусственная этика" должна быть направлена на разработку машин, демонстрирующих этичное поведение, сопоставимое с человеческими моральными агентами. Это предполагает обеспечение того, чтобы машины обладали характеристиками, указывающими на этический статус, включая как этическую продуктивность, так и восприимчивость[19].
        </p>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Конфиденциальность и наблюдение</h3>
        <p className="text-gray-600 dark:text-gray-300">
        Пересечение ИИ и неприкосновенности частной жизни ставит серьезные этические проблемы. Цифровой ландшафт, характеризующийся обширным сбором данных и практикой наблюдения, вызывает озабоченность по поводу права собственности и контроля над персональными данными. Потенциальный ущерб от утечки данных, особенно в таких чувствительных областях, как здравоохранение, подчеркивает необходимость строгих гарантий и этических рамок, регулирующих использование данных[20][21].
        </p>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Экономические последствия</h3>
        <p className="text-gray-600 dark:text-gray-300">
        Появление технологий искусственного интеллекта связано со значительными экономическими сдвигами, в частности, с перемещением рабочих мест и неравенством. Автоматизация рутинной работы привела к "вытеснению" рынка труда, непропорционально затрагивая менее привилегированные группы населения[21][22]. Поскольку традиционные системы защиты, такие как страхование от безработицы, становятся менее эффективными в этом контексте, этические соображения, касающиеся экономического равенства и поддержки перемещенных работников, становятся все более актуальными[22].
        </p>
    </div>
</section>
<section id="impact-on-society" className="py-12">
    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Воздействие на общество</h2>
    <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Экономическое неравенство и разрушение рынка труда</h3>
        <p className="text-gray-600 dark:text-gray-300">
            Интеграция искусственного интеллекта (ИИ) и робототехники в экономику вызвала обеспокоенность ростом экономического неравенства и вытеснением рабочих мест. Однако факты свидетельствуют о том, что значительное увеличение экономического неравенства произошло еще до широкого распространения ИИ, начиная с 1980-х годов. В качестве факторов, способствующих этой тенденции, часто называются такие факторы, как глобализация, жесткая макроэкономическая политика, дерегулирование и технологические инновации[23]. 
        </p>
        <p className="text-gray-600 dark:text-gray-300">
            Исторически сложилось так, что технологический прогресс приносит как пользу, так и вред рынку труда. Например, во времена Римской империи и промышленной революции высказывались опасения, что новые технологии могут подорвать гарантии занятости и уровень заработной платы[23]. В современную эпоху рынок труда демонстрирует удивительную устойчивость и способность адаптироваться к изменениям, вызванным технологическими переменами, что может говорить о том, что опасения, связанные с ИИ, несколько преждевременны[23].
        </p>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Качество рабочих мест и тенденции перемещения</h3>
        <p className="text-gray-600 dark:text-gray-300">
            По мере того как ИИ и автоматизация все больше проникают в различные отрасли, последствия для качества работы и безопасности работников становятся важнейшими темами для обсуждения. Автоматизация, как показывает практика, в непропорционально большой степени затрагивает профессии с низкой и средней квалификацией, что приводит к росту неравенства в оплате труда и сокращению занятости[24][25].
        </p>
        <p className="text-gray-600 dark:text-gray-300">
            Эти нарушения распределяются неравномерно и часто затрагивают уязвимые группы, такие как женщины, молодые работники и иммигранты, что вызывает серьезные опасения по поводу справедливости и равноправия на рынке труда[24]. Кроме того, страх перед технологическим перемещением рабочих мест может ослабить барьерную силу работников, что снижает вероятность того, что они будут выступать за улучшение условий труда или сообщать об опасностях[24]. 
        </p>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Взаимодействие и коммуникация между человеком и роботом</h3>
        <p className="text-gray-600 dark:text-gray-300">
            Эффективное взаимодействие человека и робота (HRI) имеет решающее значение для успешной интеграции ИИ и робототехники в общество. Это взаимодействие включает в себя разработку удобных интерфейсов и коммуникационных протоколов, обеспечивающих беспрепятственное сотрудничество между людьми и машинами[26]. 
        </p>
        <p className="text-gray-600 dark:text-gray-300">
            Понимание эмоциональных и коммуникативных аспектов HRI имеет огромное значение для улучшения сотрудничества между людьми и роботами. Аффективные вычисления направлены на то, чтобы наделить роботов эмоциональным интеллектом, который может улучшить их способность естественно взаимодействовать с людьми и способствовать более эффективным отношениям[27][28]. 
        </p>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Доверие, подотчетность и этические аспекты</h3>
        <p className="text-gray-600 dark:text-gray-300">
            Укрепление доверия общества к системам ИИ имеет первостепенное значение, особенно по мере того, как эти технологии становятся все более распространенными в процессах принятия решений. Прозрачность принятия решений с помощью ИИ имеет решающее значение для укрепления доверия и обеспечения того, чтобы люди понимали логику, лежащую в основе автоматизированных результатов[28]. 
        </p>
        <p className="text-gray-600 dark:text-gray-300">
            Чтобы снизить риски, связанные с предвзятостью алгоритмов, и обеспечить этичность разработки ИИ, необходимо использовать разнообразные наборы обучающих данных и инклюзивные методы разработки. Взаимодействие с общественностью для решения проблем и обеспечения прозрачности жизненно важно для разработки систем, которые не только эффективно работают, но и соответствуют общественным ценностям и этическим нормам[28]. 
        </p>
    </div>
</section>
<section id="future-trends" className="py-12">
    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Тенденции будущего</h2>
    <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-300">
            Интеграция робототехники и искусственного интеллекта (ИИ) призвана переосмыслить различные отрасли промышленности и изменить будущее работы. По мере развития этих областей появление интеллектуальных роботов, способных выполнять сложные задачи, становится все более реальным. Эта эволюция будет включать в себя несколько ключевых тенденций.
        </p>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Достижения в области робототехники</h3>
        <p className="text-gray-600 dark:text-gray-300">
            Ожидается, что робототехника будет значительно развиваться, используя искусственный интеллект для расширения своих возможностей. Роботы будущего будут обладать развитыми когнитивными способностями, позволяющими им учиться у окружающей среды и адаптироваться к меняющимся условиям. Они будут оснащены технологиями обработки естественного языка, что позволит им более интуитивно взаимодействовать с людьми, преодолевая коммуникационный разрыв между машинами и людьми[11][29].
        </p>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Повышение уровня автоматизации в различных отраслях</h3>
        <p className="text-gray-600 dark:text-gray-300">
            Спрос на автоматизацию в таких отраслях, как производство, здравоохранение и транспортные перевозки, постоянно растет. Роботы, оснащенные сложными датчиками, будут способствовать бесперебойной автоматизации, собирая и анализируя данные в режиме реального времени. Например, в обрабатывающей промышленности датчики могут обеспечить контроль качества и повысить эффективность работы[30][31]. По мере интеграции этих технологий возможности роботов по выполнению задач, которые традиционно требовали от человека ловкости рук и принятия решений, будут значительно расширяться.
        </p>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Усовершенствованные сенсорные технологии</h3>
        <p className="text-gray-600 dark:text-gray-300">
            Роль сенсоров в робототехнике будет продолжать развиваться, обеспечивая машины необходимой информацией для эффективного взаимодействия с окружающей средой. Такие датчики, как LIDAR (Light Detection and Ranging), станут более распространенными, особенно в автономных транспортных средствах для навигации и обнаружения препятствий. Интеграция передовых сенсорных технологий позволит роботам выполнять задачи, требующие точности и адаптивности, например, корректировать покрытия в режиме реального времени во время производственных процессов[32][33].
        </p>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Рост рынка искусственного интеллекта в робототехнике</h3>
        <p className="text-gray-600 dark:text-gray-300">
            Ожидается, что рынок ИИ в робототехнике будет расти по экспоненте. В 2021 году рынок оценивался примерно в 6,9 млрд долларов США, а к 2026 году, по прогнозам, достигнет 35,5 млрд долларов США при совокупном годовом темпе роста (CAGR) 38,6 %[34]. Этот рост будет обусловлен все более широким внедрением технологий ИИ в различные робототехнические приложения, включая здравоохранение, сельское хозяйство, системы "умного дома" и аэрокосмическую отрасль.
        </p>
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Этические и практические соображения</h3>
        <p className="text-gray-600 dark:text-gray-300">
            Несмотря на многообещающее будущее робототехники и искусственного интеллекта, проблемы остаются. Риски безопасности данных представляют собой серьезную угрозу по мере того, как роботы становятся взаимосвязанными через Интернет вещей. Кроме того, необходимо учитывать затраты, связанные с обслуживанием роботов, и экологические последствия производственных процессов[35]. По мере развития технологий сбалансированный подход, учитывающий как потенциал, так и подводные камни, будет иметь решающее значение для устойчивой интеграции робототехники и ИИ в общество.
        </p>
    </div>
</section>





<section id="references" className="py-12">
    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Ссылки</h2>
    <ul className="list-disc pl-6">
        <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
            <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-7-7v14" />
                </svg>
            </span>
            <a href="https://pioneerindsys.com/the-history-of-robotics-and-automation-a-comprehensive-timeline/" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[1]: История робототехники и автоматизации: A Comprehensive Timeline</a>
        </li>
        <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
            <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
                </svg>
            </span>
            <a href="https://www.intellspot.com/what-is-robotics/" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[2]: Что такое робототехника? Определение, применение, примеры - Intellspot</a>
        </li>
        <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
            <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16l4-4 4 4m0-8l-4 4-4-4" />
                </svg>
            </span>
            <a href="https://keybotic.com/history-of-robotics-a-comprehensive-history-of-evolution-and-innovation/" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[3]: История робототехники: Путешествие эволюции и революционных инноваций</a>
        </li>
        <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
            <span className="mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
                </svg>
            </span>
            <a href="https://www.pcworld.com/article/469885/historys_10_most_influential_robots.html" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[4]: 10 самых влиятельных роботов истории - PCWorld</a>
        </li>

    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://techietory.com/robotics/the-history-of-robotics-from-ancient-times-to-modern-innovations/" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[5]: История робототехники: От древних времен до современных инноваций</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://www.uti.edu/blog/robotics-and-automation/robotics-basics" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[6]: Основы робототехники: Руководство по основным концепциям и приложениям</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://en.wikipedia.org/wiki/History_of_robots" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[7]: История роботов - Википедия</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-ai" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[8]: Что такое ИИ (искусственный интеллект)? - McKinsey & Company</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://iabac.org/blog/differences-between-robotics-and-artificial-intelligence" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[9]: Различия между робототехникой и искусственным интеллектом</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://www.techtarget.com/whatis/definition/robotics" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[10]: Что такое робототехника? | Определение от TechTarget</a>
    </li>

    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://aiforsocialgood.ca/blog/artificial-intelligence-and-robotics-a-battle-for-technological-supremacy" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[11]: Искусственный интеллект против робототехники: Сравнительный анализ</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://www.coursera.org/articles/what-is-artificial-intelligence" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[12]: Что такое искусственный интеллект? Определение, применение и типы</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://builtin.com/artificial-intelligence" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[13]: Что такое искусственный интеллект (ИИ)? - Построено в</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://en.wikipedia.org/wiki/Artificial_intelligence" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[14]: Искусственный интеллект - Википедия</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://www.mckinsey.com/capabilities/operations/our-insights/human-plus-machine-a-new-era-of-automation-in-manufacturing" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[15]: Человек + машина: Новая эра автоматизации в производстве</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://www.forbes.com/sites/bernardmarr/2023/05/10/15-amazing-real-world-applications-of-ai-everyone-should-know-about/" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[16]: 15 удивительных применений искусственного интеллекта в реальном мире</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://allyrobotics.com/artificial-intelligence-vs-robotics/" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[17]: Искусственный интеллект и робототехника</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://copperdigital.com/blog/ethical-implications-ai-decision-making-manufacturing/" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[18]: Исследование этического принятия решений с помощью искусственного интеллекта</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://plato.stanford.edu/entries/ethics-ai/" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[19]: Этика искусственного интеллекта и робототехники</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://journalofethics.ama-assn.org/article/how-should-surgeons-consider-emerging-innovations-artificial-intelligence-and-robotics/2023-08" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[20]: Как хирургам следует рассматривать новые инновации</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://www.brookings.edu/articles/countering-the-geographical-impacts-of-automation-computers-ai-and-place-disparities/" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[21]: Противодействие географическим последствиям автоматизации</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://www.chicagofed.org/publications/blogs/chicago-fed-insights/2023/the-automation-of-jobs" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[22]: Ковид-19, автоматизация и перемещение рабочих мест</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://ai100.stanford.edu/gathering-strength-gathering-storms-one-hundred-year-study-artificial-intelligence-ai100-2021-1-1" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[23]: Как ИИ повлиял на социально-экономические отношения</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://blogs.cdc.gov/niosh-science-blog/2022/02/15/tjd-fow/" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[24]: Перемещение рабочих мест</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://tcf.org/content/report/robots-beginning-affect-workers-wages/" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[25]: Как роботы влияют на зарплаты</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://toolingideas.com/what-are-the-key-components-and-features-of-a-robot/" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[26]: Основные компоненты роботов</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://www.frontiersin.org/journals/neurorobotics/articles/10.3389/fnbot.2023.1084000/full" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[27]: Последние достижения в нейророботике</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://medium.com/@jamesgondola/the-future-of-work-ethical-ai-and-job-displacement-concerns-9e884cbe3b00" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[28]: Будущее работы: Этические аспекты ИИ и проблемы перемещения рабочих мест</a>
    </li>

    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://techietory.com/robotics/understanding-robot-anatomy-essential-components-explained/" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[29]: Анатомия роботов</a>
    </li>
    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
        <span className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
            </svg>
        </span>
        <a href="https://www.vaia.com/en-us/explanations/engineering/robotics-engineering/robot-sensors/" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[30]: Датчики роботов</a>
    </li>





    <li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
    <span className="mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
        </svg>
    </span>
    <a href="https://roboticsbiz.com/sensors-in-robotics-7-common-sensors-used-in-robots/" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[31]: 7 распространенных датчиков роботов</a>
</li>
<li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
    <span className="mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
        </svg>
    </span>
    <a href="https://www.mckinsey.com/capabilities/operations/our-insights/automation-robotics-and-the-factory-of-the-future" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[32]: Автоматизация и фабрика будущего</a>
</li>
<li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
    <span className="mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
        </svg>
    </span>
    <a href="https://www.vaia.com/en-us/explanations/engineering/mechanical-engineering/robotic-sensors/" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[33]: Примеры роботизированных сенсоров</a>
</li>
<li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
    <span className="mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
        </svg>
    </span>
    <a href="https://www.v7labs.com/blog/ai-in-robotics" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[34]: ИИ в робототехнике</a>
</li>
<li className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
    <span className="mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2m-2-2l2-2m8 10v1.5m-12-1.5v1.5" />
        </svg>
    </span>
    <a href="https://builtin.com/robotics" target="_blank" className="hover:text-blue-500 dark:hover:text-blue-400">[35]: Что такое роботы?</a>
</li>





    </ul>
</section>



        </div>
      </main>
    </div>
  );
};

// Объект с ссылками
const references = {
    1: "https://pioneerindsys.com/the-history-of-robotics-and-automation-a-comprehensive-timeline/",
    2: "https://www.intellspot.com/what-is-robotics/",
    3: "https://keybotic.com/history-of-robotics-a-comprehensive-history-of-evolution-and-innovation/",
    4: "https://www.pcworld.com/article/469885/historys_10_most_influential_robots.html",
    5: "https://techietory.com/robotics/the-history-of-robotics-from-ancient-times-to-modern-innovations/",
    6: "https://www.uti.edu/blog/robotics-and-automation/robotics-basics",
    7: "https://en.wikipedia.org/wiki/History_of_robots",
    8: "https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-ai",
    9: "https://iabac.org/blog/differences-between-robotics-and-artificial-intelligence",
    10: "https://www.techtarget.com/whatis/definition/robotics",
    11: "https://aiforsocialgood.ca/blog/artificial-intelligence-and-robotics-a-battle-for-technological-supremacy",
    12: "https://www.coursera.org/articles/what-is-artificial-intelligence",
    13: "https://builtin.com/artificial-intelligence",
    14: "https://en.wikipedia.org/wiki/Artificial_intelligence",
    15: "https://www.mckinsey.com/capabilities/operations/our-insights/human-plus-machine-a-new-era-of-automation-in-manufacturing",
    16: "https://www.forbes.com/sites/bernardmarr/2023/05/10/15-amazing-real-world-applications-of-ai-everyone-should-know-about/",
    17: "https://allyrobotics.com/artificial-intelligence-vs-robotics/",
    18: "https://copperdigital.com/blog/ethical-implications-ai-decision-making-manufacturing/",
    19: "https://plato.stanford.edu/entries/ethics-ai/",
    20: "https://journalofethics.ama-assn.org/article/how-should-surgeons-consider-emerging-innovations-artificial-intelligence-and-robotics/2023-08",
    21: "https://www.brookings.edu/articles/countering-the-geographical-impacts-of-automation-computers-ai-and-place-disparities/",
    22: "https://www.chicagofed.org/publications/blogs/chicago-fed-insights/2023/the-automation-of-jobs",
    23: "https://ai100.stanford.edu/gathering-strength-gathering-storms-one-hundred-year-study-artificial-intelligence-ai100-2021-1-1",
    24: "https://blogs.cdc.gov/niosh-science-blog/2022/02/15/tjd-fow/",
    25: "https://tcf.org/content/report/robots-beginning-affect-workers-wages/",
    26: "https://toolingideas.com/what-are-the-key-components-and-features-of-a-robot/",
    27: "https://www.frontiersin.org/journals/neurorobotics/articles/10.3389/fnbot.2023.1084000/full",
    28: "https://www.frontiersin.org/journals/neurorobotics/articles/10.3389/fnbot.2023.1084000/full",
    29: "https://techietory.com/robotics/understanding-robot-anatomy-essential-components-explained/",
    30: "https://www.vaia.com/en-us/explanations/engineering/robotics-engineering/robot-sensors/",
    31: "https://roboticsbiz.com/sensors-in-robotics-7-common-sensors-used-in-robots/",
    32: "https://www.mckinsey.com/capabilities/operations/our-insights/automation-robotics-and-the-factory-of-the-future",
    33: "https://www.vaia.com/en-us/explanations/engineering/mechanical-engineering/robotic-sensors/",
    34: "https://www.v7labs.com/blog/ai-in-robotics",
    35: "https://builtin.com/robotics"
};
  
  const convertReferencesToLinks = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
  
    while ((node = walker.nextNode())) {
      const parent = node.parentNode;
  
      // Проверяем, что родительский элемент допускает вставку HTML
      if (parent && parent.nodeName !== "SCRIPT" && parent.nodeName !== "STYLE") {
        const text = node.nodeValue;
  
        // Заменяем [число] на кликабельные ссылки
        const updatedText = text.replace(/\[(\d+)\]/g, (match, number) => {
          const url = references[number];
          if (url) {
            return `<a href="${url}" target="_blank">${match}</a>`;
          }
          return match; // Если ссылки нет, оставить текст как есть
        });
  
        // Если текст изменился, заменяем его HTML
        if (updatedText !== text) {
          const span = document.createElement("span");
          span.innerHTML = updatedText;
          parent.replaceChild(span, node);
        }
      }
    }
  };
  

    
export default App;
