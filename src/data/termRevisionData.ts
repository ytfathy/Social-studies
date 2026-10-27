import { QuestionItem } from '../types/curriculum';

export interface TermExamQuestion {
  id: string;
  type: 'mcq' | 'true_false' | 'text' | 'map';
  question: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
  points: number;
}

export const generalTermQuestions: QuestionItem[] = [
  // صح وخطأ مع التصويب ص 96
  {
    id: 'rev-tf-1',
    category: 'true_false',
    question: 'تُعد قارة آسيا إحدى قارات العالم القديم.',
    answer: 'صواب',
    isCorrect: true,
    correction: 'صحيح؛ آسيا وإفريقيا وأوروبا هي قارات العالم القديم.',
    source: 'كتاب الوزارة ص 96',
    isTextbookOriginal: true
  },
  {
    id: 'rev-tf-2',
    category: 'true_false',
    question: 'قارة آسيا أصغر مساحة من قارة أوروبا.',
    answer: 'خطأ',
    isCorrect: false,
    correction: 'قارة آسيا هي أكبر قارات العالم مساحة (44.2 مليون كم²)، بينما أوروبا 10.5 مليون كم².',
    source: 'كتاب الوزارة ص 96',
    isTextbookOriginal: true
  },
  {
    id: 'rev-tf-3',
    category: 'true_false',
    question: 'تُعد قارة أوروبا مهد الديانات السماوية.',
    answer: 'خطأ',
    isCorrect: false,
    correction: 'قارة آسيا هي مهد الديانات السماوية الثلاث (اليهودية، المسيحية، والإسلام).',
    source: 'كتاب الوزارة ص 96',
    isTextbookOriginal: true
  },
  {
    id: 'rev-tf-4',
    category: 'true_false',
    question: 'يُعد النيكل أحد المعادن النووية.',
    answer: 'خطأ',
    isCorrect: false,
    correction: 'النيكل من المواد الخام الحرجة (لصناعة البطاريات ومحركات الطائرات)، بينما اليورانيوم من المعادن النووية.',
    source: 'كتاب الوزارة ص 96',
    isTextbookOriginal: true
  },
  {
    id: 'rev-tf-5',
    category: 'true_false',
    question: 'آمن سكان بلاد العراق القديم بفكرة تعدد المعبودات.',
    answer: 'صواب',
    isCorrect: true,
    correction: 'صحيح؛ قدسوا قوى الطبيعة وتعددت آلهتهم ومن أشهرها عشتار.',
    source: 'كتاب الوزارة ص 96',
    isTextbookOriginal: true
  },
  {
    id: 'rev-tf-6',
    category: 'true_false',
    question: 'ينتشر نظام الغابات النفضية في إقليم منشوريا.',
    answer: 'صواب',
    isCorrect: true,
    correction: 'صحيح؛ تنتشر بين 35° و50° شمالاً في منشوريا واليابان وكوريا وشرق الصين.',
    source: 'كتاب الوزارة ص 96',
    isTextbookOriginal: true
  },
  {
    id: 'rev-tf-7',
    category: 'true_false',
    question: 'يعيش الطاووس الهندي في نظام الحشائش المعتدلة.',
    answer: 'خطأ',
    isCorrect: false,
    correction: 'يعيش في نظام الحشائش الحارة (السافانا) بالهند.',
    source: 'كتاب الوزارة ص 96',
    isTextbookOriginal: true
  },
  {
    id: 'rev-tf-8',
    category: 'true_false',
    question: 'تُعد صحراء جوبي في منغوليا من أمثلة الصحاري الحارة بقارة آسيا.',
    answer: 'خطأ',
    isCorrect: false,
    correction: 'تُعد صحراء جوبي من أمثلة الصحاري المعتدلة وتسقط عليها ثلوج شتوية.',
    source: 'كتاب الوزارة ص 96',
    isTextbookOriginal: true
  },
  {
    id: 'rev-tf-9',
    category: 'true_false',
    question: 'البحار المفتوحة أكثر ثراءً في التنوع البيولوجي من البحار شبه المغلقة.',
    answer: 'صواب',
    isCorrect: true,
    correction: 'صحيح؛ نظراً لسهولة تجدد المياه وحركة التيارات المائية وتبادل الكائنات.',
    source: 'كتاب الوزارة ص 96',
    isTextbookOriginal: true
  },
  {
    id: 'rev-tf-10',
    category: 'true_false',
    question: 'كانت الفلسفة الرومانية أساساً مهماً للفكر الغربي.',
    answer: 'خطأ',
    isCorrect: false,
    correction: 'الفلسفة اليونانية (الإغريقية) هي التي كانت أساساً للفكر الغربي كأرسطو وأفلاطون وسقراط.',
    source: 'كتاب الوزارة ص 96',
    isTextbookOriginal: true
  },

  // اختر الإجابة الصحيحة ص 96 - 97
  {
    id: 'rev-mcq-1',
    category: 'mcq',
    question: 'إحدى قارات العالم الجديد هي قارة:',
    options: ['إفريقيا', 'آسيا', 'أستراليا', 'أوروبا'],
    correctOptionIndex: 2,
    answer: 'أستراليا',
    explanation: 'أستراليا والأمريكتان وقارة أنتاركتيكا هي قارات العالم الجديد.',
    source: 'كتاب الوزارة ص 96',
    isTextbookOriginal: true
  },
  {
    id: 'rev-mcq-2',
    category: 'mcq',
    question: 'إحدى قارات العالم القديم وتحيط بها المياه من ثلاث جهات هي قارة:',
    options: ['أفريقيا', 'آسيا', 'أوروبا', 'آسيا وأوروبا معاً'],
    correctOptionIndex: 3,
    answer: 'آسيا وأوروبا معاً',
    explanation: 'كل من آسيا وأوروبا تحيط بها المياه من 3 جهات.',
    source: 'كتاب الوزارة ص 96',
    isTextbookOriginal: true
  },
  {
    id: 'rev-mcq-3',
    category: 'mcq',
    question: 'تقترب قارة آسيا من قارة إفريقيا عند مضيق:',
    options: ['جبل طارق', 'باب المندب', 'هرمز', 'البوسفور'],
    correctOptionIndex: 1,
    answer: 'باب المندب',
    explanation: 'يقترب يابس آسيا من إفريقيا عند مضيق باب المندب بالبحر الأحمر.',
    source: 'كتاب الوزارة ص 97',
    isTextbookOriginal: true
  },
  {
    id: 'rev-mcq-4',
    category: 'mcq',
    question: 'أكبر القارات من حيث الامتداد الفلكي هي قارة:',
    options: ['أوروبا', 'آسيا', 'إفريقيا', 'أستراليا'],
    correctOptionIndex: 1,
    answer: 'آسيا',
    explanation: 'تمتد آسيا من 10° جنوباً حتى 81° شمالاً ومن 26° شرقاً حتى 170° غرباً.',
    source: 'كتاب الوزارة ص 97',
    isTextbookOriginal: true
  },
  {
    id: 'rev-mcq-5',
    category: 'mcq',
    question: 'تقع هضبة شبه الجزيرة العربية في ........... قارة آسيا.',
    options: ['شرق', 'غرب', 'شمال', 'جنوب'],
    correctOptionIndex: 1,
    answer: 'غرب',
    explanation: 'تقع شبه الجزيرة العربية في غرب قارة آسيا.',
    source: 'كتاب الوزارة ص 97',
    isTextbookOriginal: true
  },
  {
    id: 'rev-mcq-6',
    category: 'mcq',
    question: 'تقع هضبة الميزيتا في دولة:',
    options: ['فرنسا', 'بريطانيا', 'إسبانيا', 'إيطاليا'],
    correctOptionIndex: 2,
    answer: 'إسبانيا',
    explanation: 'تشغل هضبة الميزيتا معظم مساحة إسبانيا في أوروبا.',
    source: 'كتاب الوزارة ص 97',
    isTextbookOriginal: true
  },
  {
    id: 'rev-mcq-7',
    category: 'mcq',
    question: 'يجري في سهول سيبيريا عدة أنهار منها نهر:',
    options: ['اليانجتسي', 'الأمازون', 'السند', 'أوب'],
    correctOptionIndex: 3,
    answer: 'أوب',
    explanation: 'أنهار سهول سيبيريا هي أوب وينسي ولينا وتصب شمالاً في المحيط القطبي.',
    source: 'كتاب الوزارة ص 97',
    isTextbookOriginal: true
  },
  {
    id: 'rev-mcq-8',
    category: 'mcq',
    question: 'يأتي معظم إنتاج الحديد في قارة أوروبا من دولة:',
    options: ['فرنسا', 'إسبانيا', 'روسيا', 'بريطانيا'],
    correctOptionIndex: 2,
    answer: 'روسيا',
    explanation: 'تتصدر روسيا دول أوروبا في إنتاج الحديد ومعظم المعادن.',
    source: 'كتاب الوزارة ص 97',
    isTextbookOriginal: true
  },
  {
    id: 'rev-mcq-9',
    category: 'mcq',
    question: 'يوجد نحو نصف مساحة المانجروف في العالم في قارة:',
    options: ['إفريقيا', 'أوروبا', 'أستراليا', 'آسيا'],
    correctOptionIndex: 3,
    answer: 'آسيا',
    explanation: 'تضم قارة آسيا نصف مساحة غابات المانجروف العالمية بسواحلها المدارية.',
    source: 'كتاب الوزارة ص 97',
    isTextbookOriginal: true
  },
  {
    id: 'rev-mcq-10',
    category: 'mcq',
    question: 'يُعد معبد البارثينون من أروع المعابد في مدينة:',
    options: ['الإسكندرية', 'روما', 'أثينا', 'مقدونيا'],
    correctOptionIndex: 2,
    answer: 'أثينا',
    explanation: 'معبد البارثينون شيد في مدينة أثينا باليونان.',
    source: 'كتاب الوزارة ص 97',
    isTextbookOriginal: true
  },

  // اكتب ما تشير إليه كل عبارة ص 98
  {
    id: 'rev-term-1',
    category: 'terms',
    question: 'جبال تُعد الحد الفاصل بين قارتي آسيا وأوروبا:',
    answer: 'جبال أورال',
    source: 'كتاب الوزارة ص 98',
    isTextbookOriginal: true
  },
  {
    id: 'rev-term-2',
    category: 'terms',
    question: 'إحدى قارات العالم القديم وتقع بالكامل في نصف الكرة الأرضية الشمالي:',
    answer: 'قارة أوروبا',
    source: 'كتاب الوزارة ص 98',
    isTextbookOriginal: true
  },
  {
    id: 'rev-term-3',
    category: 'terms',
    question: 'أعلى قمة جبلية في العالم وتقع بقارة آسيا:',
    answer: 'قمة إفرست (8848 متراً) بسلسلة جبال الهيمالايا',
    source: 'كتاب الوزارة ص 98',
    isTextbookOriginal: true
  },
  {
    id: 'rev-term-4',
    category: 'terms',
    question: 'أعلى قمة جبلية في قارة أوروبا:',
    answer: 'قمة مون بلان (4800 متر) بسلسلة جبال الألب',
    source: 'كتاب الوزارة ص 98',
    isTextbookOriginal: true
  },
  {
    id: 'rev-term-5',
    category: 'terms',
    question: 'أعلى هضبة في العالم وتوجد بقارة آسيا:',
    answer: 'هضبة التبت (وتلقب بسقف العالم)',
    source: 'كتاب الوزارة ص 98',
    isTextbookOriginal: true
  },
  {
    id: 'rev-term-6',
    category: 'terms',
    question: 'أطول أنهار قارة أوروبا ويصب في بحر قزوين:',
    answer: 'نهر الفولجا',
    source: 'كتاب الوزارة ص 98',
    isTextbookOriginal: true
  },
  {
    id: 'rev-term-7',
    category: 'terms',
    question: 'أولى دول قارة آسيا إنتاجاً للحديد:',
    answer: 'دولة الصين',
    source: 'كتاب الوزارة ص 98',
    isTextbookOriginal: true
  },
  {
    id: 'rev-term-8',
    category: 'terms',
    question: 'أولى دول قارة آسيا من حيث إنتاج النيكل:',
    answer: 'دولة إندونيسيا',
    source: 'كتاب الوزارة ص 98',
    isTextbookOriginal: true
  },
  {
    id: 'rev-term-9',
    category: 'terms',
    question: 'أعظم إنجاز معماري هندسي في الصين شُيّد لحماية الحدود من الأعداء:',
    answer: 'سور الصين العظيم',
    source: 'كتاب الوزارة ص 98',
    isTextbookOriginal: true
  },
  {
    id: 'rev-term-10',
    category: 'terms',
    question: 'أعمق بحيرات العالم في المياه العذبة وتوجد بقارة آسيا:',
    answer: 'بحيرة بيكال (لؤلؤة سيبيريا)',
    source: 'كتاب الوزارة ص 98',
    isTextbookOriginal: true
  },
  {
    id: 'rev-term-11',
    category: 'terms',
    question: 'أكبر بحيرة مياه عذبة في قارة أوروبا:',
    answer: 'بحيرة لادوجا',
    source: 'كتاب الوزارة ص 98',
    isTextbookOriginal: true
  },
  {
    id: 'rev-term-12',
    category: 'terms',
    question: 'نظام يقوم على حكم الشعب والمشاركة في اتخاذ القرار:',
    answer: 'نظام الديمقراطية (نشأ في مدينة أثينا باليونان)',
    source: 'كتاب الوزارة ص 98',
    isTextbookOriginal: true
  },
  {
    id: 'rev-term-13',
    category: 'terms',
    question: 'أول إمبراطور روماني يعتنق المسيحية ويعترف بها رسمياً:',
    answer: 'الإمبراطور قسطنطين الأول (صاحب مرسوم ميلان 313 م)',
    source: 'كتاب الوزارة ص 98',
    isTextbookOriginal: true
  },
  {
    id: 'rev-term-14',
    category: 'terms',
    question: 'لغة هي مزيج بين اللغة اليونانية والكتابة الديموطيقية:',
    answer: 'اللغة القبطية',
    source: 'كتاب الوزارة ص 98',
    isTextbookOriginal: true
  },

  // أسئلة بم تفسر الكبرى ص 99 - 100
  {
    id: 'rev-why-1',
    category: 'why',
    question: 'بم تفسر: الأهمية الإستراتيجية لموقع قارة آسيا؟',
    answer: 'لأن قارة آسيا تشرف على مسطحات مائية هامة ومضايق وممرات ملاحية دولية بالغة الخطورة مثل مضيق باب المندب، ومضيق هرمز، ومضيق ملقا.',
    source: 'كتاب الوزارة ص 99',
    isTextbookOriginal: true
  },
  {
    id: 'rev-why-2',
    category: 'why',
    question: 'بم تفسر: الأهمية الاقتصادية لموقع قارة آسيا؟',
    answer: 'لأنها كانت ولا تزال معبراً رئيسياً لطرق التجارة الدولية البرية والبحرية مثل طريق الحرير وطريق التوابل، بالإضافة لتنوع أقاليمها المناخية ومحاصيلها الزراعية.',
    source: 'كتاب الوزارة ص 99',
    isTextbookOriginal: true
  },
  {
    id: 'rev-why-3',
    category: 'why',
    question: 'بم تفسر: تُعد قارة آسيا مهد الديانات السماوية والحضارات؟',
    answer: 'لأنه قامت على أرضها أعرق الحضارات الإنسانية كبلاد الرافدين وفينيقيا واليمن والهند والصين والحضارة الإسلامية، ونزلت على أرضها الديانات السماوية الثلاث: اليهودية، والمسيحية، والإسلام.',
    source: 'كتاب الوزارة ص 99',
    isTextbookOriginal: true
  },
  {
    id: 'rev-why-4',
    category: 'why',
    question: 'بم تفسر: سهولة قيام الموانئ الطبيعية على سواحل قارة أوروبا؟',
    answer: 'بسبب كثرة تعاريج سواحل أوروبا وكثرة الجزر المتقاربة المقابلة لها.',
    source: 'كتاب الوزارة ص 99',
    isTextbookOriginal: true
  },
  {
    id: 'rev-why-5',
    category: 'why',
    question: 'بم تفسر: أهمية السهول الفيضية في قارة أوروبا؟',
    answer: 'لخصوبة تربتها الطينية وصلاحيتها للزراعة الكبرى، وتوفير المياه العذبة، وسهولة النقل والمواصلات بين أجزاء القارة وتمركز المدن الكبرى.',
    source: 'كتاب الوزارة ص 99',
    isTextbookOriginal: true
  },
  {
    id: 'rev-why-6',
    category: 'why',
    question: 'بم تفسر: يُعد الغاز الطبيعي منافساً قوياً للبترول؟',
    answer: 'بسبب سهولة استخراجه ونقله، وانخفاض تكاليف إنتاجه، ورخص ثمنه، وقلة تلويثه للبيئة مقارنة بالبترول والفحم.',
    source: 'كتاب الوزارة ص 99',
    isTextbookOriginal: true
  },
  {
    id: 'rev-why-7',
    category: 'why',
    question: 'بم تفسر: أُطلق على حضارات بلاد العراق القديم اسم «حضارات بلاد الرافدين»؟',
    answer: 'لأنها نشأت وازدهرت في السهول الفيضية الخصبة الواقعة بين رافدي نهري دجلة والفرات.',
    source: 'كتاب الوزارة ص 99',
    isTextbookOriginal: true
  },
  {
    id: 'rev-why-8',
    category: 'why',
    question: 'بم تفسر: سرعة سقوط الدولة الآشورية في العراق القديم؟',
    answer: 'بسبب اتباع ملوكها سياسة القسوة والشدة والعنف والظلم ضد الشعوب وإهمال ثرواتها، مما أدى لقيام ثورات متكررة أضعفت الدولة وأسقطتها.',
    source: 'كتاب الوزارة ص 99',
    isTextbookOriginal: true
  },
  {
    id: 'rev-why-9',
    category: 'why',
    question: 'بم تفسر: أهمية الزقورات في بلاد العراق القديم؟',
    answer: 'لأنها كانت معابد هرمية مدرجة مخصصة لإقامة الشعائر الدينية، وتتويج الملوك، وحفظ الوثائق والسجلات، ومكاناً لتلقي العلم.',
    source: 'كتاب الوزارة ص 99',
    isTextbookOriginal: true
  },
  {
    id: 'rev-why-10',
    category: 'why',
    question: 'بم تفسر: اعتماد الإمبراطورية الرومانية على القمح المصري؟',
    answer: 'بسبب تدهور الزراعة في روما نتيجة النزاعات والحروب التوسعية المستمرة، فكانت مصر بمثابة «شونة روما» التي تؤمن غذاء سكانها وجيوشها.',
    source: 'كتاب الوزارة ص 100',
    isTextbookOriginal: true
  },
  {
    id: 'rev-why-11',
    category: 'why',
    question: 'بم تفسر: تعرض مصر في عهد الإمبراطور الروماني تراجان لمجاعة؟ وماذا فعل؟',
    answer: 'بسبب انخفاض منسوب فيضان نهر النيل، وقام تراجان بإعادة بعض القمح المصري المخزن في روما إلى مصر، وأعاد حفر قناة سيزوستريس (قناة تراجان) لتنشيط النقل.',
    source: 'كتاب الوزارة ص 100',
    isTextbookOriginal: true
  },
  {
    id: 'rev-why-12',
    category: 'why',
    question: 'بم تفسر: إنشاء الإمبراطور قسطنطين الأول لمدينة القسطنطينية؟',
    answer: 'لتكون عاصمة جديدة للإمبراطورية الرومانية بدلاً من روما القديمة، وموقعاً حصيناً على مضيق البوسفور يشرف على قارتي أوروبا وآسيا.',
    source: 'كتاب الوزارة ص 100',
    isTextbookOriginal: true
  }
];

export const comprehensiveTermExamQuestions: TermExamQuestion[] = [
  {
    id: 'exam-1',
    type: 'map',
    question: 'على خريطة أوراسيا: ما هو المحيط الذي يحد قارتي آسيا وأوروبا من جهة الشمال؟',
    options: ['المحيط الهادي', 'المحيط الأطلنطي', 'المحيط القطبي الشمالي', 'المحيط الهندي'],
    correctAnswer: 2,
    explanation: 'المحيط القطبي الشمالي يحد قارتي آسيا وأوروبا من جهة الشمال.',
    points: 2
  },
  {
    id: 'exam-2',
    type: 'mcq',
    question: 'يسود النصف الجنوبي من قارة أوروبا مظاهر سطح تتمثل في:',
    options: ['السهول الفيضية', 'السلاسل الجبلية العالية (الألب)', 'الهضاب المنبسطة', 'الكثبان الرملية'],
    correctAnswer: 1,
    explanation: 'تسود السلاسل الجبلية العالية مثل جبال الألب الجزء الجنوبي من قارة أوروبا.',
    points: 2
  },
  {
    id: 'exam-3',
    type: 'mcq',
    question: 'تنتج قارة آسيا نحو ثلثي الإنتاج العالمي من معدن النيكل، وتتصدر دول القارة والعالم دولة:',
    options: ['الصين', 'إندونيسيا', 'الهند', 'كازاخستان'],
    correctAnswer: 1,
    explanation: 'إندونيسيا هي الأولى عالمياً بآسيا في إنتاج النيكل.',
    points: 2
  },
  {
    id: 'exam-4',
    type: 'mcq',
    question: 'انقسم المجتمع العراقي القديم إلى عدة طبقات على رأسها الملك والكهنة ورجال الحكم، بينما تمتع بمكانة مرموقة:',
    options: ['التاجر', 'الجندي', 'الكاتب', 'الفلاح'],
    correctAnswer: 2,
    explanation: 'تمتع الكاتب بمكانة مرموقة في مجتمع العراق القديم لندرة المتعلمين وأهمية التدوين.',
    points: 2
  },
  {
    id: 'exam-5',
    type: 'mcq',
    question: 'يظهر على منحدرات هضبة التبت الشاهقة بآسيا نظام حشائش:',
    options: ['السافانا الحارة', 'الإستبس المعتدلة', 'الحشائش الباردة (التندرا)', 'الغابات المدارية'],
    correctAnswer: 2,
    explanation: 'تظهر حشائش التندرا الباردة فوق هضبة التبت وفي المنحدرات القطبية.',
    points: 2
  },
  {
    id: 'exam-6',
    type: 'true_false',
    question: 'تجاهلت الحضارة الإسلامية علوم الحضارات السابقة ولم تعتنِ بها.',
    correctAnswer: false,
    explanation: 'خطأ؛ انفتحت الحضارة الإسلامية على علوم اليونان والفرس والهنود وترجمتها في بيت الحكمة ونقدتها وطورتها.',
    points: 2
  },
  {
    id: 'exam-7',
    type: 'true_false',
    question: 'يُعد نهر ميكونج في قارة آسيا ثالث أنهار العالم من حيث التنوع البيولوجي.',
    correctAnswer: true,
    explanation: 'صواب؛ نهر ميكونج بجنوب شرق آسيا يأتي ثالثاً عالمياً بعد الأمازون والكونغو في التنوع البيولوجي.',
    points: 2
  },
  {
    id: 'exam-8',
    type: 'true_false',
    question: 'انتشر في اليمن القديم الخط المسند المكون من 29 حرفاً.',
    correctAnswer: true,
    explanation: 'صواب؛ الخط المسند هو الأبجدية اليمنية القديمة ونقشت بها الآثار والمعابد.',
    points: 2
  },
  {
    id: 'exam-9',
    type: 'mcq',
    question: 'تم القضاء على حركة الرِّدّة في عهد الخليفة الراشد:',
    options: ['عمر بن الخطاب', 'أبو بكر الصديق', 'عثمان بن عفان', 'علي بن أبي طالب'],
    correctAnswer: 1,
    explanation: 'الخليفة أبو بكر الصديق رضي الله عنه هو الذي قاد جهود القضاء على حركة الردة وتثبيت أركان الدولة.',
    points: 2
  },
  {
    id: 'exam-10',
    type: 'mcq',
    question: 'يساهم نظام الغابات الموسمية في صناعة السفن بفضل وفرة أخشاب أشجار:',
    options: ['الزان', 'الساج', 'الصنوبر', 'الشربين'],
    correctAnswer: 1,
    explanation: 'أشجار الساج في الغابات الموسمية تشتهر بصلابتها الشديدة ومقاومتها للماء.',
    points: 2
  },
  {
    id: 'exam-11',
    type: 'mcq',
    question: 'أشهر معبودات فينيقيا القديمة التي جسدت قوى الطبيعة معبود:',
    options: ['عشتار فقط', 'بعل', 'آمون', 'سيرابيس'],
    correctAnswer: 1,
    explanation: 'المعبود «بعل» كان كبير معبودات الفينيقيين وجسد قوى الخصب والطبيعة.',
    points: 2
  },
  {
    id: 'exam-12',
    type: 'mcq',
    question: 'تولى قيادة حركة تحرير اليمن من الأحباش بالاستعانة بالفرس الأمير:',
    options: ['سرجون', 'سيف بن ذي يزن', 'حمورابي', 'بلقيس'],
    correctAnswer: 1,
    explanation: 'الأمير سيف بن ذي يزن استنجد بكسرى ملك الفرس لطرد الأحباش.',
    points: 2
  },
  {
    id: 'exam-13',
    type: 'true_false',
    question: 'حظيت المرأة بمكانة رفيعة في بلاد اليمن القديم ومارست الحكم مثل الملكة بلقيس.',
    correctAnswer: true,
    explanation: 'صواب؛ كان للمرأة حق اختيار الزوج ووراثة العرش والوصول لأعلى المناصب كبلقيس.',
    points: 2
  },
  {
    id: 'exam-14',
    type: 'true_false',
    question: 'أصدر الإمبراطور دقلديانوس مرسوم ميلان لإعلان التسامح الديني.',
    correctAnswer: false,
    explanation: 'خطأ؛ قسطنطين الأول هو من أصدر مرسوم ميلان 313 م، بينما دقلديانوس قاد عصر الشهداء واضطهدهم.',
    points: 2
  },
  {
    id: 'exam-15',
    type: 'mcq',
    question: 'أنشئت أول كنيسة والمدرسة اللاهوتية في مصر بمدينة الإسكندرية على يد:',
    options: ['القديس أنطونيوس', 'القديس مرقس', 'الإسكندر الأكبر', 'بطليموس الأول'],
    correctAnswer: 1,
    explanation: 'القديس مرقس هو مؤسس كنيسة الإسكندرية ومدرستها اللاهوتية منتصف القرن الأول الميلادي.',
    points: 2
  }
];
