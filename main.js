/* global Mesibo */


var btnUser1 = document.getElementById('user-1');
var btnUser2 = document.getElementById('user-2');


btnUser1.addEventListener('click', async () => {
  // Token de acesso do usuário 1
  user_token = '31dfd06912f942543e797678ddd2b459d15496dedf10a4615e554bbd06paf9b1d95ea5';

  // Destino da chamada do usuário 1
  destination = 'usuario2@email.com';

  // Configurações do Mesibo API
  api.setAppName(appid);
  var listener = new MesiboListener(api);
  api.setListener(listener);
  api.setAccessToken(user_token);
  api.start();

  await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

});

btnUser2.addEventListener('click', async () => {
  // Token de acesso do usuário 2
  user_token = '7f33bf862cf040907967f35e66fef490975c549126eacedd4bbd28qa55eab39b13';

  // Destino da chamada do usuário 2
  destination = 'usuario1@email.com';

  // Configurações do Mesibo API
  api.setAppName(appid);
  var listener = new MesiboListener(api);
  api.setListener(listener);
  api.setAccessToken(user_token);
  api.start();


  // 
  await navigator.mediaDevices.getUserMedia({ video: true, audio: true });


});


// Variáveis globais para token, ID do aplicativo e destino
var user_token = '';
var destination = '';
var appid = 'com.exemploteste';

// Função construtora para o listener do Mesibo
function MesiboListener(o) {
  this.api = o;
}

// Gerencia o status da conexão
MesiboListener.prototype.Mesibo_onConnectionStatus = function (status) {
  console.log("Mesibo_onConnectionStatus: " + status);

  var s = document.getElementById("cstatus");
  if (!s) {
    return;
  }


  if (MESIBO_STATUS_ONLINE === status) {
    s.classList.replace("btn-danger", "btn-success");
    s.innerText = "Você está online";
    return;
  }

  s.classList.replace("btn-success", "btn-danger");
  s.innerText = status === MESIBO_STATUS_AUTHFAIL
    ? "Desconectado: Token ou ID do aplicativo inválido"
    : "Você está offline";
};

// Gerencia chamadas recebidas
MesiboListener.prototype.Mesibo_onCall = function (callid, from, video) {
  console.log("Mesibo_onCall: " + (video) + " chamada de: " + from);

  // Configura os elementos de vídeo para a chamada
  this.api.setupVideoCall("localVideo", "remoteVideo", true);

  var s = document.getElementById("ansBody");
  if (s) {
    s.innerText = "Chamada de vídeo recebida de: " + from;
  }

  // Exibe o modal de chamada recebida
  $('#answerModal').modal({ show: true });
};

// Gerencia o status das chamadas
MesiboListener.prototype.Mesibo_onCallStatus = function (callid, status) {
  console.log("Mesibo_onCallStatus: " + status);

  var v = document.getElementById("vcstatus");
  var a = document.getElementById("acstatus");

  var s = "";
  if (status & MESIBO_CALLSTATUS_COMPLETE) {
    s = "Chamada finalizada";
    console.log("Encerrando modal");
    $('#answerModal').modal("hide");
  }

  // Atualiza o status da chamada com base no código recebido
  switch (status) {
    case MESIBO_CALLSTATUS_RINGING:
      s = "Tocando";
      break;
    case MESIBO_CALLSTATUS_ANSWER:
      s = "Atendido";
      break;
    case MESIBO_CALLSTATUS_BUSY:
      s = "Ocupado";
      break;
    case MESIBO_CALLSTATUS_NOANSWER:
      s = "Sem resposta";
      break;
    case MESIBO_CALLSTATUS_INVALIDDEST:
      s = "Destino inválido";
      break;
    case MESIBO_CALLSTATUS_UNREACHABLE:
      s = "Inalcançável";
      break;
    case MESIBO_CALLSTATUS_OFFLINE:
      s = "Offline";
      break;
  }

  // Exibe o status da chamada nos elementos correspondentes
  if (v) v.innerText = "Status da chamada: " + s;
  if (a) a.innerText = "Status da chamada: " + s;
};

// Inicializa a API do Mesibo
var api = new Mesibo();

// Função para iniciar uma chamada de vídeo
function video_call() {
  api.setupVideoCall("localVideo", "remoteVideo", true);
  api.call(destination);
}

// Alterna o estado de mudo do vídeo
function video_mute_toggle() {
  api.toggleVideoMute();
}

// Alterna o estado de mudo do áudio
function audio_mute_toggle() {
  api.toggleAudioMute();
}

// Encerra a chamada
function hangup() {
  api.hangup();
}

// Atende uma chamada
function answer() {
  $('#answerModal').modal("hide");
  api.answer(true);
}
