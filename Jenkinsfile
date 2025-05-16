pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        // Multibranch Pipeline сам клонирует репо, но на всякий случай:
        checkout scm
      }
    }

    stage('Build Services') {
      steps {
        // Убедимся, что docker-compose видит файлы
        sh 'ls -R .'

        // Собираем backend и frontend
        sh 'docker compose -f docker-compose.yml build'
      }
    }

    stage('Debug workspace') {
        steps {
            sh 'ls -R .'
        }
    }
    

    stage('Run Tests') {
        steps {
            sh '''
            docker compose -f docker-compose.yml up -d
            # Ждём поднятия
            sleep 5
            # -T отключает TTY
            docker compose -f docker-compose.yml exec -T backend pytest --maxfail=1 --disable-warnings -q
            docker compose -f docker-compose.yml down
            '''
        }
    }

    stage('Push Images') {
        when { branch 'main' }
        steps {
            withCredentials([usernamePassword(
                credentialsId: 'docker-token',  // ID, которое вы указали при добавлении
                usernameVariable: 'DOCKER_USER',   // Переменная для логина
                passwordVariable: 'DOCKER_PASS'    // Переменная для пароля
            )]) {
                sh '''
                    echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    docker compose -f docker-compose.yml push
                '''
            }
        }
    }
  }

  post {
    always {
      // Очищаем workspace, чтобы не копились артефакты
      cleanWs()
    }
  }
}