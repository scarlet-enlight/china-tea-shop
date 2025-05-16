pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        // Not nessesary for multibranch
        checkout scm
      }
    }

    stage('Build Services') {
      steps {
        // sh 'ls -R .'

        // Build backend and frontend
        sh 'docker compose -f docker-compose.yml build'
      }
    }
    

    stage('Run Tests') {
        steps {
            sh '''
            docker compose -f docker-compose.yml up -d
            # Wait...
            sleep 5

            docker compose -f docker-compose.yml exec -T backend pytest --maxfail=1 --disable-warnings -q
            docker compose -f docker-compose.yml down
            '''
        }
    }

    stage('Push Images') {
        when { branch 'main' }
        steps {
            withCredentials([usernamePassword(
                credentialsId: 'docker-token',
                usernameVariable: 'DOCKER_USER',
                passwordVariable: 'DOCKER_PASS'
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
      // Clean workspace
      cleanWs()
    }
  }
}