'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel =document.querySelector('#result > p');

  const quizSet = [
    {q: '言葉の最小の単位は？' , c:['単語', '文', '文節']},
    {q: '大きい段落は？' , c:['意味段落', 'ひと段落', '形式段落']},
    {q: '「泉」の読みは？' , c:['いずみ', 'みず', 'みずうみ']},
    {q: '次のうち形容動詞どれか？' , c:['静かだ', 'きれい', '見る']},
    {q: '「させる」の命令形は？' , c:['させろ', 'させ', 'させれ']},
    {q: '現存する日本最古の物語は？' , c:['竹取物語', '源氏物語', '枕草子']},
    {q: '夏目漱石の作品はどれか？' , c:['「坊ちゃん」', '「舞姫」', '「羅生門」']},
    {q: '「腰」の読みは？' , c:['こし', 'あし', 'のし']},
    {q: '「生きる」の活用の種類は？' , c:['上一段活用', '五段活用', 'カ行変格活用']},
    {q: '次のうち五段活用はどれか？' , c:['行く', '生きる', 'する']},
  ];
  let currentNum = 0;
  let isAnswered;
  let score =0;

  

  function shuffle(arr) {
    for (let i = arr.length -1; i > 0; i--) {
      const j =Math.floor(Math.random() * (i + 1));
      [arr[j],arr[i]] = [arr[i] ,arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');  
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click' , () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click' , () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');
    
    if (currentNum === quizSet.length-1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    }else {
      currentNum++;
      setQuiz();
    }
  });
}