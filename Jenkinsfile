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
          set -e

          docker compose -f docker-compose.yml up -d

          for i in {1..10}; do
            if docker compose exec -T backend curl -f http://localhost:5000/healthcheck; then
              echo "Backend is up!"
              break
            fi
            echo "Waiting for backend..."
            sleep 2
          done

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