package controllers

import play.api._
import play.api.mvc._

object Application extends Controller {

  def index = Action {
    Ok(views.html.index())
  }

  def about = Action {
    Ok(views.html.about())
  }

  def resume = Action {
    //download resume
    Ok(views.html.index())
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
