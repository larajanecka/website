package controllers

import play.api._
import play.api.mvc._
import play.api.libs.iteratee.Enumerator

object Application extends Controller {

  def index = Action {
    Ok(views.html.index())
  }

  def about = Action {
    Ok(views.html.about())
  }

  def resume = Action {
    Ok.sendFile(new java.io.File("./public/resume.pdf"))
  }

  def skills = Action {
    Ok(views.html.skills())
  }

  def experience = Action {
    Ok(views.html.experience())
  }

  def soft = Action {
    Ok(views.html.soft())
  }

  def contact = Action {
    Ok(views.html.contact())
  }

}
