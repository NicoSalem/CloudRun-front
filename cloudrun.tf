resource "google_cloud_run_service" "default" {
  name     = "cloudrun-srv"
  location = "us-central1"

  template {
    spec {
      containers {
        image = "us-central1-docker.pkg.dev/groovy-autumn-290918/app1-repo/cloudrun-front-1:tag1"
      }
    }
  }
}
